pipeline {
    agent any
      stages {
        stage("Build") {
            steps {
            //echo "===REQUIRED: building the API==="
             sh "npm install"
             sh "npm run build"
            // sh "docker build . -t nadiamiteva/best-playz-backend_app"
            }
        }
        stage("Deliver") {
            steps {
                 echo "===== REQUIRED: Will deliver the API to Docker Hub ====="
				//	sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
				//	sh "docker push nadiamiteva/best-playz-backend_app"
            }
        }
        stage("Release staging environment") {
            steps {
               // echo "===== REQUIRED: Will use Docker Compose to spin up a test environment ====="
               sh "docker-compose -p staging -f docker-compose.yml -f docker-compose.test.yml up -d"
            }
        }
    }
}
