pipeline {
    agent any

    tools {nodejs "node16"}

    environment {
        CHROME_BIN = '/bin/google-chrome'
    }

    stages {

        stage('e2e Tests') {
            steps {
                bat 'npm run testDemoQA'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}
