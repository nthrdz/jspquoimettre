require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function configureSupabaseURLs() {
  try {
    console.log('🌐 Configuration des URLs Supabase...\n')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const projectId = supabaseUrl?.split('.')[0]?.replace('https://', '')

    console.log('📋 URLs à configurer dans Supabase Dashboard:')
    console.log(`   Projet: ${projectId}`)
    console.log(`   Dashboard: https://supabase.com/dashboard/project/${projectId}/authentication/settings\n`)

    console.log('🔗 Site URL:')
    console.log('   Production: https://votre-domaine.com')
    console.log('   Développement: http://localhost:3001\n')

    console.log('🔄 Redirect URLs à ajouter:')
    console.log('   Développement:')
    console.log('   - http://localhost:3001/dashboard')
    console.log('   - http://localhost:3001/auth/callback')
    console.log('   - http://localhost:3001/coaching')
    console.log('   - http://localhost:3001/galerie')
    console.log('   - http://localhost:3001/signup')
    console.log('   - http://localhost:3001/login\n')

    console.log('   Production (remplacez "votre-domaine.com"):')
    console.log('   - https://votre-domaine.com/dashboard')
    console.log('   - https://votre-domaine.com/auth/callback')
    console.log('   - https://votre-domaine.com/coaching')
    console.log('   - https://votre-domaine.com/galerie')
    console.log('   - https://votre-domaine.com/signup')
    console.log('   - https://votre-domaine.com/login\n')

    console.log('📧 Configuration des emails:')
    console.log('   1. Allez dans Authentication > Settings')
    console.log('   2. Activez "Enable email confirmations"')
    console.log('   3. Personnalisez les templates d\'email si souhaité\n')

    console.log('🔐 Configuration OAuth:')
    console.log('   1. Allez dans Authentication > Providers')
    console.log('   2. Activez Google OAuth:')
    console.log('      - Client ID: Votre Google Client ID')
    console.log('      - Client Secret: Votre Google Client Secret')
    console.log('   3. (Optionnel) Activez GitHub OAuth')
    console.log('   4. (Optionnel) Activez Discord OAuth\n')

    console.log('🧪 Test de la configuration:')
    console.log('   1. Créez un compte sur http://localhost:3001/signup')
    console.log('   2. Vérifiez que l\'email de confirmation arrive')
    console.log('   3. Testez la connexion Google')
    console.log('   4. Vérifiez que la redirection vers /dashboard fonctionne\n')

    console.log('📝 Instructions détaillées:')
    console.log('   Consultez le fichier SUPABASE_AUTH_CONFIGURATION.md')

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message)
  }
}

configureSupabaseURLs()
