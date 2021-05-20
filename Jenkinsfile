pipeline {
    agent any
    triggers{
        pollSCM("H/5 * * * *")
    }
    stages {
        stage("Build") {
            steps {
            //echo "===REQUIRED: building the API==="
             sh "npm install"
             sh "npm run build"
            }
        }
        stage("Build database") {
            steps {
                echo "===== OPTIONAL: Will build the database (if using a state-based approach)Using Flyway so No ====="
            }
        }
        stage("Deliver") {
            steps {
                // echo "===== REQUIRED: Will deliver the API to Docker Hub ====="
                sh "docker build . -t best-playz-backend_main"
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']])
				{
					sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
				}
                sh "docker push nadiamiteva/best-playz-backend_main"
            }
        }
        stage("Release staging environment") {
            steps {
                echo "===== REQUIRED: Will use Docker Compose to spin up a test environment ====="
               // sh "docker-compose pull"
               // sh "docker-compose up -d"
            }
        }
    }
}
