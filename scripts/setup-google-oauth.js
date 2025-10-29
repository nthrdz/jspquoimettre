require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function setupGoogleOAuth() {
  try {
    console.log('🔐 Configuration Google OAuth pour Supabase...\n')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const projectId = supabaseUrl?.split('.')[0]?.replace('https://', '')

    console.log('📋 Étapes pour configurer Google OAuth:\n')

    console.log('1️⃣ Créer un projet Google Cloud:')
    console.log('   🌐 Allez sur: https://console.cloud.google.com/')
    console.log('   ➕ Créez un nouveau projet ou sélectionnez un existant')
    console.log('   📝 Nom du projet: "Athlink OAuth" (ou votre choix)\n')

    console.log('2️⃣ Activer l\'API Google+ :')
    console.log('   🔍 APIs & Services > Library')
    console.log('   🔍 Recherchez "Google+ API" et activez-la')
    console.log('   ⏳ Attendez l\'activation (quelques secondes)\n')

    console.log('3️⃣ Créer des identifiants OAuth:')
    console.log('   🔑 APIs & Services > Credentials')
    console.log('   ➕ Create Credentials > OAuth 2.0 Client IDs')
    console.log('   📱 Application type: Web application')
    console.log('   📝 Name: "Athlink Web App"')
    console.log('   🌐 Authorized redirect URIs:')
    console.log(`      https://${projectId}.supabase.co/auth/v1/callback`)
    console.log('   💾 Cliquez sur "Create"\n')

    console.log('4️⃣ Récupérer les clés:')
    console.log('   📋 Copiez le Client ID et Client Secret')
    console.log('   💾 Gardez-les précieusement !\n')

    console.log('5️⃣ Configurer dans Supabase:')
    console.log(`   🌐 Allez sur: https://supabase.com/dashboard/project/${projectId}/authentication/providers`)
    console.log('   🔧 Cliquez sur "Google"')
    console.log('   ✅ Activez "Enable Google provider"')
    console.log('   📝 Collez le Client ID et Client Secret')
    console.log('   💾 Sauvegardez\n')

    console.log('6️⃣ Ajouter dans .env.local:')
    console.log('   📝 Ajoutez ces lignes dans votre .env.local:')
    console.log('   GOOGLE_CLIENT_ID=votre_client_id_ici')
    console.log('   GOOGLE_CLIENT_SECRET=votre_client_secret_ici')
    console.log('   NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true\n')

    console.log('7️⃣ Configurer les URLs de redirection:')
    console.log(`   🌐 Allez sur: https://supabase.com/dashboard/project/${projectId}/authentication/settings`)
    console.log('   🔗 Site URL: http://localhost:3001 (développement)')
    console.log('   🔄 Redirect URLs:')
    console.log('      - http://localhost:3001/dashboard')
    console.log('      - http://localhost:3001/auth/callback')
    console.log('      - http://localhost:3001/coaching')
    console.log('      - http://localhost:3001/galerie\n')

    console.log('8️⃣ Tester la configuration:')
    console.log('   🧪 Allez sur: http://localhost:3001/login')
    console.log('   🔘 Cliquez sur "Continuer avec Google"')
    console.log('   ✅ Vérifiez que la redirection fonctionne\n')

    console.log('📚 Documentation:')
    console.log('   📖 Google OAuth: https://developers.google.com/identity/protocols/oauth2')
    console.log('   📖 Supabase Auth: https://supabase.com/docs/guides/auth/social-login/auth-google')

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message)
  }
}

setupGoogleOAuth()
