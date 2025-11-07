pipeline {
  agent any

  environment {
    AWS_REGION = "ca-central-1"
    ECR_REGISTRY = "975050024946.dkr.ecr.ca-central-1.amazonaws.com"
    FRONTEND_IMAGE = "${ECR_REGISTRY}/learnerreport-frontend"
    BACKEND_IMAGE = "${ECR_REGISTRY}/learnerreport-backend"
    IMAGE_TAG = "${env.BUILD_NUMBER}"
    K8S_NAMESPACE = "learnerreport"
    CHART_PATH = "helm"
  }

  stages {

    stage('Checkout Code') {
      steps {
        echo "Checking out code from GitHub..."
        checkout scm
      }
    }

    stage('Setup AWS CLI') {
      steps {
        withCredentials([
          string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
          string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {
          sh '''
            mkdir -p ~/.aws
            cat > ~/.aws/credentials <<EOF
[default]
aws_access_key_id=$AWS_ACCESS_KEY_ID
aws_secret_access_key=$AWS_SECRET_ACCESS_KEY
region=${AWS_REGION}
EOF
            echo "AWS credentials configured."
          '''
        }
      }
    }

    stage('Login to ECR') {
      steps {
        echo "Logging into Amazon ECR..."
        sh '''
          aws ecr get-login-password --region ${AWS_REGION} \
            | docker login --username AWS --password-stdin ${ECR_REGISTRY}
        '''
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          echo "Building Docker images for Frontend and Backend..."
          sh '''
            docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ./frontend
            docker build -t ${BACKEND_IMAGE}:${IMAGE_TAG} ./backend
          '''
        }
      }
    }

    stage('Push Images to ECR') {
      steps {
        echo "Pushing images to ECR..."
        sh '''
          docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
          docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
        '''
      }
    }

    stage('Deploy with Helm to Kubernetes') {
      steps {
        echo "Deploying MERN app to Kubernetes using Helm..."
        withCredentials([file(credentialsId: 'kubeconfig-file', variable: 'KUBECONFIG_FILE')]) {
          sh '''
            export KUBECONFIG=${KUBECONFIG_FILE}
            kubectl create namespace ${K8S_NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

            helm upgrade --install learnerreport ${CHART_PATH} \
              --namespace ${K8S_NAMESPACE} \
              --set image.repositoryFrontend=${FRONTEND_IMAGE} \
              --set image.repositoryBackend=${BACKEND_IMAGE} \
              --set image.tag=${IMAGE_TAG} \
              --wait --timeout 5m
          '''
        }
      }
    }
  }

  post {
    success {
      echo "CI/CD pipeline completed successfully!"
      echo "Images pushed:"
      echo " - ${FRONTEND_IMAGE}:${IMAGE_TAG}"
      echo " - ${BACKEND_IMAGE}:${IMAGE_TAG}"
      echo "Application deployed to Kubernetes namespace: ${K8S_NAMESPACE}"
    }
    failure {
      echo "Pipeline failed. Check logs for details."
    }
  }
}
