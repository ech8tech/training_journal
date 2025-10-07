pipeline {
    agent any
    
    options {
        // Build retention and timeout settings
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        // ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        
        // Skip default checkout if needed
        // skipDefaultCheckout()
    }
    
    environment {
        NODE_VERSION   = '20'
        VPS_HOST       = '167.17.180.14'
        VPS_USER       = 'qtoxic'
        FRONTEND_IMAGE = 'frontend'
        DOCKER_TAG     = "${env.BUILD_NUMBER}-${env.GIT_COMMIT[0..7]}"
        GITHUB_REPO    = 'https://github.com/ech8tech/training_journal.git'
    }
    
    parameters {
        // For Multibranch Pipeline, parameters are optional
        // Branch is automatically determined by Jenkins
        choice(
            name: 'DEPLOY_ENVIRONMENT',
            choices: ['staging', 'production'],
            description: 'Target deployment environment'
        )
        booleanParam(
            name: 'SKIP_TESTS',
            defaultValue: true,
            description: 'Skip running tests'
        )
        booleanParam(
            name: 'FORCE_DEPLOY',
            defaultValue: false,
            description: 'Force deployment regardless of branch'
        )
    }
    
    stages {
        stage('Checkout & Setup') {
            steps {
                script {
                    echo "Starting build for commit: ${env.GIT_COMMIT}"
                    echo "Current branch: ${env.BRANCH_NAME}"
                    echo "Build number: ${env.BUILD_NUMBER}"
                    
                    // For Multibranch Pipeline, checkout is automatic
                    // Just verify we're on the right branch
                    sh '''
                        echo "Current branch:"
                        git branch --show-current
                        echo "All branches:"
                        git branch -a
                        echo "Remote branches:"
                        git branch -r
                    '''
                }
            }
        }
        
        stage('Validation') {
            steps {
                script {
                    echo "Validating build parameters..."
                    echo "Current branch: ${env.BRANCH_NAME}"
                    
                    // Production deployment validation
                    if (params.DEPLOY_ENVIRONMENT == 'production' && env.BRANCH_NAME != 'main') {
                        error("Production deployments are only allowed from main branch")
                    }
                    
                    echo "Validation passed for branch: ${env.BRANCH_NAME}"
                }
            }
        }
        
        stage('Test') {
            when {
                expression { params.SKIP_TESTS }
            }
            steps {
                script {
                    echo "Running tests..."
                    // Add your test commands here
                    sh '''
                        echo "Running linting..."
                        npm ci || echo "No package.json found, skipping npm install"
                        npm run lint || echo "No lint script found"
                        npm run test || echo "No test script found"
                    '''
                }
            }
        }
        
        stage('Build & Package') {
            parallel {
                stage('Build Frontend (amd64)') {
                    steps {
                        script {
                            def CONTEXT = sh(script: 'test -d frontend && echo frontend || echo .', returnStdout: true).trim()
                            echo "Docker build context: ${CONTEXT}"

                            sh """
                                set -eux
                                
                                # Create buildx builder if it doesn't exist
                                docker buildx create --name jx --use || docker buildx use jx
                                docker buildx inspect --bootstrap
                                
                                # Build with proper tagging
                                DOCKER_BUILDKIT=1 docker buildx build \
                                    --platform linux/amd64 \
                                    --pull \
                                    -t ${env.FRONTEND_IMAGE}:${env.DOCKER_TAG} \
                                    -t ${env.FRONTEND_IMAGE}:latest \
                                    --load \
                                    -f ${CONTEXT}/Dockerfile \
                                    ${CONTEXT}
                                
                                # Save image for deployment
                                docker save ${env.FRONTEND_IMAGE}:${env.DOCKER_TAG} | gzip > ${env.FRONTEND_IMAGE}-${env.DOCKER_TAG}.tar.gz
                                
                                # Verify build
                                docker images | grep ${env.FRONTEND_IMAGE}
                                ls -lah *.tar.gz
                            """
                        }
                    }
                }
                
                // stage('Prepare Deployment Files') {
                //     steps {
                //         script {
                //             echo "Preparing deployment configuration..."
                //             sh '''
                //                 # Copy docker-compose file for deployment
                //                 cp docker-compose.prod.yml docker-compose.deploy.yml
                                
                //                 echo "Deployment files prepared"
                //                 ls -lah docker-compose.deploy.yml
                //             '''
                //         }
                //     }
                // }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    expression { params.FORCE_DEPLOY == true }
                    expression { env.BRANCH_NAME == 'main' }
                    expression { env.BRANCH_NAME == 'develop' }
                    expression { env.BRANCH_NAME == 'feature' }
                }
            }
            steps {
                script {
                    def deployEnvironment = params.DEPLOY_ENVIRONMENT ?: 'staging'
                    echo "Deploying to ${deployEnvironment} environment"
                    
                    sshagent(credentials: ['vps-ssh-key']) {
                        sh '''#!/usr/bin/env bash
                            set -Eeuo pipefail
                            
                            # Configuration
                            HOST="${VPS_HOST}"
                            USER="${VPS_USER}"
                            IMAGE_FILE="${FRONTEND_IMAGE}-${DOCKER_TAG}.tar.gz"
                            DEPLOY_FILE="docker-compose.prod.yml"
                            
                            # Remote paths
                            REMOTE_IMAGES="~/images"
                            REMOTE_APP="~/training_journal"
                            REMOTE_BACKUP="~/backups"
                            
                            echo "Starting deployment process..."
                            echo "Target: ${USER}@${HOST}"
                            echo "Image: ${IMAGE_FILE}"
                            echo "Environment: ${DEPLOY_ENVIRONMENT}"
                            
                            # Create remote directories
                            ssh -o StrictHostKeyChecking=no -o ConnectTimeout=30 "$USER@$HOST" "
                                mkdir -p $REMOTE_IMAGES $REMOTE_APP $REMOTE_BACKUP
                            "

                            # ls -la $REMOTE_APP
                            # cat $REMOTE_APP/docker-compose.prod.yml
                            # cat ./$DEPLOY_FILE
                            
                            # Backup current deployment
                            ssh -o StrictHostKeyChecking=no "$USER@$HOST" "
                               cd $REMOTE_APP && 
                               if [ -f docker-compose.prod.yml ]; then
                                   cp docker-compose.prod.yml $REMOTE_BACKUP/docker-compose.prod.yml.backup.$(date +%Y%m%d_%H%M%S)
                               fi
                            " || echo "No existing deployment to backup"
                            
                            # Copy files
                            echo "Copying image file..."
                            scp -o StrictHostKeyChecking=no -o ConnectTimeout=30 "./$IMAGE_FILE" "$USER@$HOST:$REMOTE_IMAGES/"
                            
                            echo "Copying deployment files..."
                            scp -o StrictHostKeyChecking=no -o ConnectTimeout=30 "./$DEPLOY_FILE" "$USER@$HOST:$REMOTE_APP/"
                            
                            # Deploy
                            ssh -o StrictHostKeyChecking=no "$USER@$HOST" "bash -lc '
                                set -Eeuo pipefail
                                
                                echo "Loading Docker image..."
                                docker load -i \"$REMOTE_IMAGES/$IMAGE_FILE\"
                                
                                echo "Starting services with DOCKER_TAG=${DOCKER_TAG}..."
                                cd $REMOTE_APP
                                # DOCKER_TAG=${DOCKER_TAG} docker compose -f docker-compose.deploy.yml down || true
                                # DOCKER_TAG=${DOCKER_TAG} docker compose -f docker-compose.deploy.yml up -d
                                DOCKER_TAG=${DOCKER_TAG} docker compose -f docker-compose.prod.yml down || true
                                DOCKER_TAG=${DOCKER_TAG} docker compose -f docker-compose.prod.yml up -d
                                
                                echo "Verifying deployment..."
                                sleep 10
                                docker compose -f docker-compose.prod.yml ps
                                
                                echo "Deployment completed successfully!"
                            '"
                        '''
                    }
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                script {
                    echo "Cleaning up build artifacts..."
                    sh '''
                        # Clean up Docker images and containers
                        docker image prune -f || true
                        docker container prune -f || true
                        
                        # Clean up build artifacts
                        rm -f *.tar.gz || true
                        # rm -f docker-compose.deploy.yml || true
                        
                        echo "Cleanup completed"
                    '''
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "Pipeline execution completed"
                // Archive artifacts
                archiveArtifacts artifacts: '*.tar.gz', allowEmptyArchive: true
                
                // Clean workspace
                cleanWs()
            }
        }
        success {
            script {
                echo 'Pipeline succeeded!'
                
                // Send success notification
                def message = """
                ✅ Pipeline SUCCESS
                Branch: ${env.BRANCH_NAME}
                Build: ${env.BUILD_NUMBER}
                Commit: ${env.GIT_COMMIT[0..7]}
                Environment: ${params.DEPLOY_ENVIRONMENT ?: 'staging'}
                """
                
                echo message
                
                // Add notification logic here
                // emailext (
                //     subject: "Build Success: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                //     body: message,
                //     to: "team@company.com"
                // )
            }
        }
        failure {
            script {
                echo 'Pipeline failed!'
                
                // Send failure notification
                def message = """
                ❌ Pipeline FAILED
                Branch: ${env.BRANCH_NAME}
                Build: ${env.BUILD_NUMBER}
                Commit: ${env.GIT_COMMIT[0..7]}
                Environment: ${params.DEPLOY_ENVIRONMENT ?: 'staging'}
                """
                
                echo message
                
                // Add notification logic here
                // emailext (
                //     subject: "Build Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                //     body: message,
                //     to: "team@company.com"
                // )
            }
        }
        unstable {
            script {
                echo 'Pipeline completed with warnings!'
                
                def message = """
                ⚠️ Pipeline UNSTABLE
                Branch: ${env.BRANCH_NAME}
                Build: ${env.BUILD_NUMBER}
                Commit: ${env.GIT_COMMIT[0..7]}
                """
                
                echo message
            }
        }
        aborted {
            script {
                echo 'Pipeline was aborted!'
            }
        }
    }
}
