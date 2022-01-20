pipeline {
    agent any
    environment {
        USER_CREDENTIALS = credentials('srv-jenkins')
	NAME = "sfa"
        VERSION = "${env.BUILD_ID}-${env.GIT_COMMIT}"
        IMAGE = "${NAME}:${VERSION}"
        HARBOR_URL = "10.230.5.2"
        HARBOR_PROJECT = "eserv-tst-ns"
    }

    triggers {
        githubPush()
    }


    stages {
        stage('Build and Push') {
            steps {
                script {
                    def app = docker.build("${HARBOR_URL}/${HARBOR_PROJECT}/${NAME}:${VERSION}")
                    docker.withRegistry("https://${HARBOR_URL}", "srv-jenkins-domain") {
                        app.push()
                        app.push("latest")
                    }

                }
            }
        }

        stage('Remove local image') {
            steps {
                sh "docker rmi ${HARBOR_URL}/${HARBOR_PROJECT}/${NAME}:${VERSION}"
            }
        }

        stage('Deploy') {

            steps {
                sh 'tkc=$(curl -XPOST -u $USER_CREDENTIALS_USR@ynet.gov.yk.ca:$USER_CREDENTIALS_PSW https://10.230.5.1/wcp/login -k -d \'{"guest_cluster_name":"eserv-tst-cluster"}\' -H "Content-Type: application/json"); tkc_server=$(echo $tkc | jq -r .guest_cluster_server); tkc_session=$(echo $tkc | jq -r .session_id); kubectl config set-cluster $tkc_server --server=https://$tkc_server:6443 --insecure-skip-tls-verify=true; kubectl config set-context tkc-context-prod --cluster=$tkc_server; kubectl --context tkc-context-prod apply -f yaml/ -n sfa --token=$tkc_session'
            }
        }

        stage('Refresh deployments') {

            steps {
                sh 'tkc=$(curl -XPOST -u $USER_CREDENTIALS_USR@ynet.gov.yk.ca:$USER_CREDENTIALS_PSW https://10.230.5.1/wcp/login -k -d \'{"guest_cluster_name":"eserv-tst-cluster"}\' -H "Content-Type: application/json"); tkc_server=$(echo $tkc | jq -r .guest_cluster_server); tkc_session=$(echo $tkc | jq -r .session_id); kubectl config set-cluster $tkc_server --server=https://$tkc_server:6443 --insecure-skip-tls-verify=true; kubectl config set-context tkc-context-prod --cluster=$tkc_server; kubectl --context tkc-context-prod -n sfa rollout restart deployment sfa-deployment --token=$tkc_session'
            }
        }

    }
    post {
        success {
            echo 'Build complete'
        }
        failure {
            echo 'Build failed'
        }
    }
}

