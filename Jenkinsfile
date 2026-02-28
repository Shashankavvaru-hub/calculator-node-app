pipeline {
    agent any

    environment {
        IMAGE_NAME = "avvarushashank/my-k8s-app"
        TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$TAG .'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push $IMAGE_NAME:$TAG'
            }
        }

        stage('Deploy to Minikube') {
            steps {
                sh '''
                kubectl apply -f k8s/deployment.yml
                kubectl apply -f k8s/service.yml
                kubectl set image deployment/my-k8s-app my-k8s-app=$IMAGE_NAME:$TAG
                kubectl rollout status deployment/my-k8s-app
                '''
            }
        }
    }
}
