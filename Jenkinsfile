pipeline {
    agent any
    triggers{
        pollSCM("H/5 * * * *")
    }
    stages {
        stage("Build API") {
            steps {
            echo "===REQUIRED: building the API==="
                //sh "dotnet build src/api/API.csproj"
            }
        }
        stage("Build database") {
            steps {
                echo "===== OPTIONAL: Will build the database (if using a state-based approach)Using Flyway so No ====="
            }
        }
        stage("Test API") {
            steps {
              echo "===== REQUIRED: Will execute unit tests of the API project ====="
              //sh "dotnet test test/UnitTest UnitTest.csproj"
            }
        }
        stage("Deliver API") {
            steps {
                echo "===== REQUIRED: Will deliver the API to Docker Hub ====="
                /* sh "docker build ./db/docker -t nadiamiteva/mysqlserver-db"
                withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'DockerHub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']])
				{
					sh 'docker login -u ${USERNAME} -p ${PASSWORD}'
				}
                sh "docker push nadiamiteva/mysqlserver-db" */
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
