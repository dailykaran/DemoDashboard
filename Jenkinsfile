pipeline {
   agent any

   tools {nodejs "Node16"}

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
         Parallel{
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
       stage('Deploy') {
           steps {
               echo 'Deploying....'
           }
       }
   }
}

}
