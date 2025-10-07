pipeline {
    agent any
    
    environment {
        NODE_VERSION = '20'
        FRONTEND_IMAGE = 'frontend'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        GITHUB_REPO = 'https://github.com/ech8tech/training_journal.git'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh '''
                    # создать билдера (повторный вызов не мешает)
                    docker buildx create --name jx --use || docker buildx use jx
                    docker buildx inspect --bootstrap
                '''
                echo "Building from branch: ${env.BRANCH_NAME}"
            }
        }

        stage('What is in workspace?') {
            steps {
                sh '''
                    pwd
                    ls -la
                    echo "Git HEAD: $(git rev-parse --short HEAD)"
                    echo "Repo root files:"
                    ls -la
                '''
            }
        }
        
        stage('Build Frontend (amd64)') {
            steps {
                script {
                    def CONTEXT = sh(script: 'test -d frontend && echo frontend || echo .', returnStdout: true).trim()
                    echo "Docker build context: ${CONTEXT}"

                    sh """
                        set -eux
                        docker buildx create --name jx --use || docker buildx use jx
                        docker buildx inspect --bootstrap

                        DOCKER_BUILDKIT=1 docker buildx build \
                            --platform linux/amd64 \
                            --pull \
                            -t ${env.FRONTEND_IMAGE}:prod \
                            --load \
                            -f ${CONTEXT}/Dockerfile \
                            ${CONTEXT}

                        docker save ${env.FRONTEND_IMAGE}:prod | gzip > ${env.FRONTEND_IMAGE}.tar.gz
                        ls -lah
                    """
                }
            }
        }

        // пример: загрузка на сервер сразу отсюда
        // stage('Upload to VPS') {
        //   steps {
        //     sshagent(credentials: ['vps-ssh-key']) {
        //       sh '''
        //         scp -o StrictHostKeyChecking=no frontend/${FRONTEND_IMAGE}.tar.gz user@vps:~/deploy/
        //         ssh -o StrictHostKeyChecking=no user@vps '
        //           gunzip -c ~/deploy/${FRONTEND_IMAGE}.tar.gz | docker load &&
        //           cd ~/deploy && docker compose up -d
        //         '
        //       '''
        //     }
        //   }
        // }
        
        stage('Cleanup') {
            steps {
                sh '''
                    echo "Cleaning up old Docker images..."
                    docker image prune -f || true
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'

            // Send notification if configured
            script {
                if (env.BRANCH_NAME == 'main') {
                    echo "Production deployment successful!"
                } else {
                    echo "Development deployment successful!"
                }
            }
        }
        failure {
            echo 'Pipeline failed!'
            // Send failure notification if configured
        }
        unstable {
            echo 'Pipeline completed with warnings!'
        }
    }
}
