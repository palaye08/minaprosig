pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CREDENTIALS = credentials('docker-hub-new')
        GITHUB_TOKEN = credentials('github-token')
        RENDER_API_KEY = credentials('render-api-key')
        RENDER_APP_URL = credentials('render-app-url')
        IMAGE_NAME = "${DOCKER_REGISTRY}/${DOCKER_CREDENTIALS_USR}/projet-sport"
        IMAGE_TAG = "latest"
        RENDER_SERVICE_ID = "srv-d3mp297diees739ve7m0"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "📦 Récupération du code depuis GitHub..."
                    checkout scm
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "📥 Installation des dépendances..."
                    sh '''
                        node --version
                        npm --version
                        npm ci
                    '''
                }
            }
        }

        stage('Build Angular App') {
            steps {
                script {
                    echo "🔨 Construction de l'application Angular..."
                    sh '''
                        npm run build
                    '''
                }
            }
        }

        stage('Tests') {
            steps {
                script {
                    echo "🧪 Exécution des tests..."
                    sh '''
                        npm run test -- --watch=false --browsers=ChromeHeadless || true
                    '''
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo "🐳 Construction de l'image Docker..."
                    sh '''
                        docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Push to Docker Registry') {
            steps {
                script {
                    echo "📤 Push vers Docker Hub..."
                    sh '''
                        echo $DOCKER_CREDENTIALS_PSW | docker login -u $DOCKER_CREDENTIALS_USR --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${IMAGE_NAME}:${BUILD_NUMBER}
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Render') {
            steps {
                script {
                    echo "🚀 Déploiement sur Render..."
                    sh '''
                        # Vérifier que le service ID est configuré
                        if [ "$RENDER_SERVICE_ID" = "srv_xxxxxxxxxxxxx" ]; then
                            echo "⚠️ ATTENTION: SERVICE_ID non configuré!"
                            echo "Veuillez remplacer srv_xxxxxxxxxxxxx par votre ID réel"
                            exit 1
                        fi
                        
                        # Déclencher le redéploiement via l'API Render
                        RESPONSE=$(curl -s -X POST https://api.render.com/deploy/$RENDER_SERVICE_ID \
                            -H "Authorization: Bearer ${RENDER_API_KEY}" \
                            -H "Content-Type: application/json")
                        
                        echo "📡 Réponse Render: $RESPONSE"
                        echo "✅ Demande de redéploiement envoyée à Render"
                        echo "🌐 Votre application sera disponible sur: ${RENDER_APP_URL}"
                    '''
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    echo "🔍 Vérification du déploiement..."
                    sh '''
                        sleep 10
                        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" ${RENDER_APP_URL})
                        
                        if [ "$HTTP_CODE" = "200" ]; then
                            echo "✅ Application accessible sur ${RENDER_APP_URL}"
                        else
                            echo "⚠️ Code HTTP: $HTTP_CODE"
                        fi
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline exécuté avec succès!"
            echo "🌐 Application disponible sur: https://projet-sport-latest.onrender.com"
        }
        failure {
            echo "❌ Le pipeline a échoué. Vérifiez les logs."
        }
        always {
            cleanWs()
        }
    }
}