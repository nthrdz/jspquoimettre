require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { createClient } = require('@supabase/supabase-js')

async function testOAuthConfig() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  try {
    console.log('🔐 Test de la configuration OAuth...\n')

    // Test 1: Vérifier la configuration Supabase
    console.log('1️⃣ Vérification de la configuration Supabase...')
    console.log(`   URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
    console.log(`   Anon Key: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Défini' : '❌ Non défini'}`)

    // Test 2: Vérifier les providers OAuth configurés
    console.log('\n2️⃣ Vérification des providers OAuth...')
    
    // Google OAuth
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
      console.log('   ✅ Google OAuth configuré')
      console.log(`      Client ID: ${process.env.GOOGLE_CLIENT_ID.substring(0, 20)}...`)
    } else {
      console.log('   ⚠️ Google OAuth non configuré')
      console.log('      Ajoutez GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET dans .env.local')
    }

    // GitHub OAuth
    if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
      console.log('   ✅ GitHub OAuth configuré')
      console.log(`      Client ID: ${process.env.GITHUB_CLIENT_ID.substring(0, 20)}...`)
    } else {
      console.log('   ⚠️ GitHub OAuth non configuré (optionnel)')
    }

    // Test 3: Tester la connexion Supabase
    console.log('\n3️⃣ Test de connexion Supabase...')
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log(`   ❌ Erreur de connexion: ${error.message}`)
    } else {
      console.log('   ✅ Connexion Supabase réussie')
    }

    // Test 4: Vérifier les URLs de redirection
    console.log('\n4️⃣ URLs de redirection recommandées:')
    console.log('   Pour le développement:')
    console.log('   - http://localhost:3001/dashboard')
    console.log('   - http://localhost:3001/auth/callback')
    console.log('   Pour la production:')
    console.log('   - https://votre-domaine.com/dashboard')
    console.log('   - https://votre-domaine.com/auth/callback')

    console.log('\n📝 Prochaines étapes:')
    console.log('1. Allez sur https://supabase.com/dashboard/project/ioyklugzwavjyondimwd/authentication/settings')
    console.log('2. Configurez les URLs de redirection')
    console.log('3. Activez les providers OAuth souhaités')
    console.log('4. Activez l\'envoi d\'emails de confirmation')
    console.log('5. Testez la connexion OAuth sur votre site')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testOAuthConfig()
