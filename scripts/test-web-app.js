require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testWebApp() {
  try {
    console.log('🌐 Test de l\'application web...\n')

    const baseUrl = 'http://localhost:3001'

    // Test 1: Page d'accueil
    console.log('1️⃣ Test de la page d\'accueil...')
    try {
      const response = await fetch(baseUrl)
      if (response.ok) {
        console.log('✅ Page d\'accueil accessible')
      } else {
        console.log(`❌ Erreur page d\'accueil: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ Erreur page d\'accueil: ${error.message}`)
    }

    // Test 2: Page de connexion
    console.log('\n2️⃣ Test de la page de connexion...')
    try {
      const response = await fetch(`${baseUrl}/login`)
      if (response.ok) {
        console.log('✅ Page de connexion accessible')
      } else {
        console.log(`❌ Erreur page de connexion: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ Erreur page de connexion: ${error.message}`)
    }

    // Test 3: Page d'inscription
    console.log('\n3️⃣ Test de la page d\'inscription...')
    try {
      const response = await fetch(`${baseUrl}/signup`)
      if (response.ok) {
        console.log('✅ Page d\'inscription accessible')
      } else {
        console.log(`❌ Erreur page d\'inscription: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ Erreur page d\'inscription: ${error.message}`)
    }

    // Test 4: Page dashboard (doit rediriger vers login)
    console.log('\n4️⃣ Test de la page dashboard...')
    try {
      const response = await fetch(`${baseUrl}/dashboard`)
      if (response.status === 307 || response.status === 302) {
        console.log('✅ Page dashboard redirige correctement vers login')
      } else if (response.ok) {
        console.log('⚠️ Page dashboard accessible (utilisateur connecté?)')
      } else {
        console.log(`❌ Erreur page dashboard: ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ Erreur page dashboard: ${error.message}`)
    }

    console.log('\n🎉 Tests de l\'application web terminés!')
    console.log('\n📝 Instructions pour tester manuellement:')
    console.log('1. 🌐 Ouvrez http://localhost:3001 dans votre navigateur')
    console.log('2. 🔐 Allez sur http://localhost:3001/login')
    console.log('3. 📧 Connectez-vous avec: test-supabase@athlink.com')
    console.log('4. 🔑 Mot de passe: test123456')
    console.log('5. ✅ Vérifiez que vous arrivez sur le dashboard')
    console.log('6. 📊 Vérifiez dans Supabase Dashboard > Authentication')

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.message)
  }
}

testWebApp()
