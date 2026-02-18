// Color functions for beautiful output
def success(message) { echo "\033[32m✅ ${message}\033[0m" }
def error(message) { echo "\033[31m❌ ${message}\033[0m" }
def warning(message) { echo "\033[33m⚠️ ${message}\033[0m" }
def info(message) { echo "\033[34mℹ️ ${message}\033[0m" }
def step(message) { echo "\033[36m🔵 ${message}\033[0m" }

pipeline {
    agent any

    options {
        // Build retention and timeout settings
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        ansiColor('xterm')
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // Skip default checkout if needed
        // skipDefaultCheckout()
    }

    environment {
        NODE_VERSION   = "20"
        VPS_HOST       = "31.192.106.220"
        VPS_USER       = "qtoxic"

        FRONTEND_IMAGE = "frontend"
        DOCKER_TAG     = "${env.BUILD_NUMBER}-${env.GIT_COMMIT[0..7]}"

        REMOTE_IMAGES  = "~/images"
        REMOTE_APP     = "~/training_journal"

        CONTEXT        = '.'
        GITHUB_REPO    = 'https://github.com/ech8tech/training_journal.git'

        // Color codes for easy use
        GREEN   = '\033[32m'
        RED     = '\033[31m'
        YELLOW  = '\033[33m'
        BLUE    = '\033[34m'
        PURPLE  = '\033[35m'
        CYAN    = '\033[36m'
        RESET   = '\033[0m'
    }

    parameters {
        // For Multibranch Pipeline, parameters are optional
        // Branch is automatically determined by Jenkins
        // choice(
        //     name: 'DEPLOY_ENVIRONMENT',
        //     choices: ['staging', 'production'],
        //     description: 'Target deployment environment'
        // )
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
        stage('Validation') {
            steps {
                script {
                    info("Starting build for commit: ${env.GIT_COMMIT}")
                    info("Current branch: ${env.BRANCH_NAME}")
                    info("Build number: ${env.BUILD_NUMBER}")

                    // Test beautiful color functions
                    // success("ansiColor test - SUCCESS")
                    // error("ansiColor test - ERROR")
                    // warning("ansiColor test - WARNING")
                    // info("ansiColor test - INFO")
                    // step("ansiColor test - STEP")

                    // Production deployment validation
                    // if (params.DEPLOY_ENVIRONMENT == 'production' && env.BRANCH_NAME != 'main') {
                    //     info("Validating build parameters...")
                    //     error("Production deployments are only allowed from main branch")
                    // }

                    success("Validation passed for branch: ${env.BRANCH_NAME}")
                }
            }
        }

        stage('Test') {
            when {
                expression { !params.SKIP_TESTS }
            }
            steps {
                script {
                    info("Install packages...")
                    sh '''#!/usr/bin/env bash
                        set -Eeuo pipefail
                        npm ci || echo -e "${YELLOW}⚠️ No package.json found, skipping npm install${RESET}"
                    '''

                    info("🔍 Running linting...")
                    sh '''#!/usr/bin/env bash
                        set -Eeuo pipefail
                        npm run lint || echo -e "${YELLOW}⚠️ No lint script found${RESET}"
                    '''

                    info("🧪 Running tests...")
                    sh '''#!/usr/bin/env bash
                        set -Eeuo pipefail
                        npm run test || echo -e "${YELLOW}⚠️ No test script found${RESET}"
                    '''

                    success("Test stage completed!")
                }
            }
        }

        stage('Build & Package') {
            steps {
                script {
                    sh """#!/usr/bin/env bash
                        set -Eeuo pipefail

                        echo -e "${BLUE}🛠️ Create buildx builder if it doesn't exist...${RESET}"
                        docker buildx create --name jx --use || docker buildx use jx
                        docker buildx inspect --bootstrap

                        echo -e "${BLUE}🛠️ Build with proper tagging...${RESET}"
                        DOCKER_BUILDKIT=1 docker buildx build \
                            --platform linux/amd64 \
                            --pull \
                            -t ${FRONTEND_IMAGE}:${DOCKER_TAG} \
                            -t ${FRONTEND_IMAGE}:latest \
                            --load \
                            -f ${CONTEXT}/Dockerfile \
                            ${CONTEXT}

                        echo -e "${BLUE}💾 Save image for deployment...${RESET}"
                        docker save ${FRONTEND_IMAGE}:${DOCKER_TAG} | gzip > ${FRONTEND_IMAGE}-${DOCKER_TAG}.tar.gz

                        echo -e "${BLUE}✅ Verify build...${RESET}"
                        docker images | grep ${FRONTEND_IMAGE}
                        ls -lah *.tar.gz
                    """
                }
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
                    // def deployEnvironment = params.DEPLOY_ENVIRONMENT ?: 'staging'

                    sshagent(credentials: ['vps-ssh-key']) {
                        sh '''#!/usr/bin/env bash
                            set -Eeuo pipefail

                            # Configuration
                            HOST="${VPS_HOST}"
                            USER="${VPS_USER}"
                            IMAGE_FILE="${FRONTEND_IMAGE}-${DOCKER_TAG}.tar.gz"
                            DEPLOY_FILE="docker-compose.prod.yml"

                            echo -e "${BLUE}🚀 Starting deployment process...${RESET}"
                            echo -e "${BLUE}🎯 Target: ${USER}@${HOST} ${RESET}"
                            echo -e "${BLUE}🎞️ Image: ${IMAGE_FILE} ${RESET}"

                            echo -e "${BLUE}🗄️ Create remote directories...${RESET}"
                            ssh -o StrictHostKeyChecking=no -o ConnectTimeout=30 "$USER@$HOST" "
                                mkdir -p ${REMOTE_IMAGES} ${REMOTE_APP}
                            "

                            echo -e "${BLUE}🗄️ Copying image file...${RESET}"
                            scp -o StrictHostKeyChecking=no -o ConnectTimeout=30 "./$IMAGE_FILE" "$USER@$HOST:${REMOTE_IMAGES}/"

                            echo -e "${BLUE}🗄️ Copying deployment files...${RESET}"
                            scp -o StrictHostKeyChecking=no -o ConnectTimeout=30 "./$DEPLOY_FILE" "$USER@$HOST:${REMOTE_APP}/"

                            # Deploy
                            ssh -o StrictHostKeyChecking=no "$USER@$HOST" "bash -lc '
                                set -Eeuo pipefail

                                echo -e "${BLUE}🫗 Loading Docker image...${RESET}"
                                docker load -i \"$REMOTE_IMAGES/$IMAGE_FILE\"

                                echo -e "${BLUE}✈️ Starting services with DOCKER_TAG=${DOCKER_TAG}...${RESET}"
                                cd ${REMOTE_APP}
                                DOCKER_TAG=${DOCKER_TAG} docker compose -f docker-compose.prod.yml down || true
                                DOCKER_TAG=${DOCKER_TAG} docker compose -f docker-compose.prod.yml up -d

                                echo -e "${BLUE}✅ Verifying deployment...${RESET}"
                                sleep 10
                                docker compose -f docker-compose.prod.yml ps
                                echo -e "${GREEN}✅ Deployment completed successfully!${RESET}"
                            '"
                        '''
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    info("🧹 Clean up Docker images and containers...")
                    sh '''
                        docker image prune -f || true
                        docker container prune -f || true
                    '''

                    info("🧹 Clean up build artifacts...")
                    sh '''
                        rm -f *.tar.gz || true
                    '''

                    info("🧹 Clean up local...")
                    sh '''
                        IMAGE_NAME="${FRONTEND_IMAGE}:${DOCKER_TAG}"
                        docker images --format "{{.Repository}}:{{.Tag}}" \
                            | grep "^${FRONTEND_IMAGE}:" \
                            | grep -v "$IMAGE_NAME" \
                            | xargs -r docker rmi
                    '''

                    // Clean up remote server (only if deployment was successful)
                    info("🧹 Clean up remote server...")
                    sshagent(credentials: ['vps-ssh-key']) {
                        sh '''#!/usr/bin/env bash
                            set -Eeuo pipefail

                            HOST="${VPS_HOST}"
                            USER="${VPS_USER}"
                            IMAGE_FILE="${FRONTEND_IMAGE}-${DOCKER_TAG}.tar.gz"
                            IMAGE_NAME="${FRONTEND_IMAGE}:${DOCKER_TAG}"

                            echo -e "${BLUE}🗑️ Removing images from remote server...${RESET}"
                            ssh -o StrictHostKeyChecking=no "$USER@$HOST" "bash -lc '
                                # Remove current archive
                                rm -f ${REMOTE_IMAGES}/$IMAGE_FILE || true

                                docker images --format "{{.Repository}}:{{.Tag}}" | grep "frontend:" | grep -v $IMAGE_NAME | xargs -r docker rmi

                                echo -e "${GREEN}✅ Remote cleanup completed successfully...${RESET}"
                            '"
                        '''
                    }

                    success("Clean up completed successfully!")
                }
            }
        }
    }

    post {
        always {
            script {
                success("Pipeline execution completed!")

                // Archive artifacts
                archiveArtifacts artifacts: '*.tar.gz', allowEmptyArchive: true

                // Clean workspace
                cleanWs()
            }
        }
        success {
            script {
                success("Pipeline succeeded!")

                // Send success notification
                def message = """
                    ✅ Pipeline SUCCESS
                    Branch: ${env.BRANCH_NAME}
                    Build: ${env.BUILD_NUMBER}
                    Commit: ${env.GIT_COMMIT[0..7]}
                """

                echo message
            }
        }
        failure {
            script {
                error("Pipeline failed!")

                // Send failure notification
                def message = """
                    ❌ Pipeline FAILED
                    Branch: ${env.BRANCH_NAME}
                    Build: ${env.BUILD_NUMBER}
                    Commit: ${env.GIT_COMMIT[0..7]}
                """

                echo message
            }
        }
        unstable {
            script {
                warning("Pipeline completed with warnings!")

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
                error("Pipeline was aborted!")
            }
        }
    }
}
