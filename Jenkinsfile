pipeline {
    agent any

    tools {
        jdk 'Java 17'
        maven 'maven'
    }

    environment {
        BACKEND_IMAGE = "jerin07/finance-tracker:latest"
        FRONTEND_IMAGE = "jerin07/finance-frontend:latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Cod-E-Tron701/Finance-Tracker.git'
            }
        }

        stage('Build Backend') {
            steps {
                sh 'mvn clean package'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                sh 'docker build -t $BACKEND_IMAGE .'
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    sh '''
                        npm install
                        npm run build
                        docker build -t $FRONTEND_IMAGE .
                    '''
                }
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh '''
                    docker ps -q --filter "name=finance-tracker" | xargs -r docker stop
                    docker ps -aq --filter "name=finance-tracker" | xargs -r docker rm
                    docker ps -q --filter "name=finance-frontend" | xargs -r docker stop
                    docker ps -aq --filter "name=finance-frontend" | xargs -r docker rm
                '''
            }
        }

        stage('Run Containers') {
            steps {
                sh '''
                    docker run -d --name finance-tracker -p 9191:8080 $BACKEND_IMAGE
                    docker run -d --name finance-frontend -p 3000:80 $FRONTEND_IMAGE
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

