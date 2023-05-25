pipeline {
   agent any

   tools {nodejs "node16"}

   environment {
       CHROME_BIN = '/bin/google-chrome'
      
   }
stages {
       stage('Dependencies') {
           steps {
               sh 'npm i'
           }
       }
       stage('e2e Tests') {
             stage('Test 1') {
                  steps {
               bat 'npm run testDemoQA'
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
