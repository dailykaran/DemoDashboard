pipeline {
    agent any

    tools {nodejs "node16"}

   
    stages {
        
        stage('Dependencies') {
            steps {
                bat 'npm i'
            }
        }

        stage('e2e Tests') {
            Parallel{
                 environment {
                        CHROME_BIN = '/bin/google-chrome'
                    }
                stage('Test 1') {
                    steps {
                        bat 'npm run testDemoQA'
                    }
                }
                stage('Test 2') {
                    steps {
                        bat 'npm run testDemoQA1'
                    }
                }
            }
        }
    
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}

