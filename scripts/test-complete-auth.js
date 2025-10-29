require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { createClient } = require('@supabase/supabase-js')

async function testCompleteAuth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  try {
    console.log('🧪 Test complet de l\'authentification Supabase...\n')

    // Test 1: Configuration de base
    console.log('1️⃣ Test de la configuration de base...')
    console.log(`   ✅ Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
    console.log(`   ✅ Anon Key: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Défini' : 'Non défini'}`)
    console.log(`   ✅ Service Key: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Défini' : 'Non défini'}`)

    // Test 2: Connexion Supabase
    console.log('\n2️⃣ Test de connexion Supabase...')
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log(`   ❌ Erreur: ${error.message}`)
    } else {
      console.log('   ✅ Connexion Supabase réussie')
    }

    // Test 3: Configuration OAuth
    console.log('\n3️⃣ Test de la configuration OAuth...')
    const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED === 'true'
    const githubEnabled = process.env.NEXT_PUBLIC_GITHUB_OAUTH_ENABLED === 'true'
    const discordEnabled = process.env.NEXT_PUBLIC_DISCORD_OAUTH_ENABLED === 'true'

    console.log(`   ${googleEnabled ? '✅' : '⚠️'} Google OAuth: ${googleEnabled ? 'Activé' : 'Non activé'}`)
    console.log(`   ${githubEnabled ? '✅' : '⚠️'} GitHub OAuth: ${githubEnabled ? 'Activé' : 'Non activé'}`)
    console.log(`   ${discordEnabled ? '✅' : '⚠️'} Discord OAuth: ${discordEnabled ? 'Activé' : 'Non activé'}`)

    // Test 4: URLs de redirection
    console.log('\n4️⃣ URLs de redirection recommandées:')
    console.log('   🔗 Site URL: http://localhost:3001')
    console.log('   🔄 Redirect URLs:')
    console.log('      - http://localhost:3001/dashboard')
    console.log('      - http://localhost:3001/auth/callback')
    console.log('      - http://localhost:3001/coaching')
    console.log('      - http://localhost:3001/galerie')

    // Test 5: Configuration des emails
    console.log('\n5️⃣ Configuration des emails:')
    console.log('   📧 Activez "Enable email confirmations" dans Supabase Dashboard')
    console.log('   📧 Personnalisez les templates d\'email si souhaité')

    // Test 6: Instructions de test
    console.log('\n6️⃣ Instructions de test:')
    console.log('   🧪 Testez l\'inscription: http://localhost:3001/signup')
    console.log('   🧪 Testez la connexion: http://localhost:3001/login')
    console.log('   🧪 Testez Google OAuth: Cliquez sur "Continuer avec Google"')
    console.log('   🧪 Vérifiez la redirection vers /dashboard')

    // Test 7: Vérification des pages
    console.log('\n7️⃣ Test des pages web...')
    try {
      const response = await fetch('http://localhost:3001')
      if (response.ok) {
        console.log('   ✅ Page d\'accueil accessible')
      } else {
        console.log(`   ❌ Erreur page d\'accueil: ${response.status}`)
      }
    } catch (error) {
      console.log(`   ⚠️ Serveur non démarré: ${error.message}`)
    }

    console.log('\n🎉 Test terminé!')
    console.log('\n📝 Prochaines étapes:')
    console.log('1. Configurez les URLs dans Supabase Dashboard')
    console.log('2. Activez les providers OAuth souhaités')
    console.log('3. Activez l\'envoi d\'emails de confirmation')
    console.log('4. Testez manuellement sur votre site')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testCompleteAuth()