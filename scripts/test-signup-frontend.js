require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testSignupFrontend() {
  try {
    console.log('🧪 Test de l\'inscription frontend...\n')

    const testUser = {
      email: `test-frontend-${Date.now()}@example.com`,
      password: 'test123456',
      name: 'Test Frontend',
      username: `testfrontend${Date.now()}`,
      sport: 'Course à pied'
    }

    console.log('📝 Données de test:')
    console.log(`   Email: ${testUser.email}`)
    console.log(`   Username: ${testUser.username}`)
    console.log(`   Sport: ${testUser.sport}`)

    // Test 1: Vérifier que la page d'inscription est accessible
    console.log('\n🌐 Test 1: Page d\'inscription...')
    const signupPageResponse = await fetch('http://localhost:3001/signup')
    
    if (signupPageResponse.ok) {
      console.log('✅ Page d\'inscription accessible')
    } else {
      console.log('❌ Page d\'inscription inaccessible')
      return
    }

    // Test 2: Test de l'API d'inscription
    console.log('\n🚀 Test 2: API d\'inscription...')
    const signupResponse = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    })

    if (signupResponse.ok) {
      const signupData = await signupResponse.json()
      console.log('✅ Inscription réussie!')
      console.log(`   User ID: ${signupData.user.id}`)
      console.log(`   Email: ${signupData.user.email}`)
      console.log(`   Username: ${signupData.user.username}`)
    } else {
      const errorData = await signupResponse.json()
      console.log('❌ Erreur d\'inscription:')
      console.log(`   Status: ${signupResponse.status}`)
      console.log(`   Error: ${errorData.error}`)
      if (errorData.details) {
        console.log(`   Details: ${JSON.stringify(errorData.details, null, 2)}`)
      }
      return
    }

    // Test 3: Test de l'API de connexion
    console.log('\n🔐 Test 3: API de connexion...')
    const loginResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    })

    if (loginResponse.ok) {
      const loginData = await loginResponse.json()
      console.log('✅ Connexion réussie!')
      console.log(`   User ID: ${loginData.user.id}`)
      console.log(`   Email: ${loginData.user.email}`)
      console.log(`   Name: ${loginData.user.name}`)
    } else {
      const errorData = await loginResponse.json()
      console.log('❌ Erreur de connexion:')
      console.log(`   Status: ${loginResponse.status}`)
      console.log(`   Error: ${errorData.error}`)
    }

    console.log('\n🎉 Test frontend terminé!')
    console.log('\n📝 Instructions pour tester manuellement:')
    console.log('1. Allez sur http://localhost:3001/signup')
    console.log('2. Remplissez le formulaire avec des données valides')
    console.log('3. Cliquez sur "Créer mon profil"')
    console.log('4. Vérifiez que vous êtes redirigé vers /login')
    console.log('5. Connectez-vous avec vos identifiants')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testSignupFrontend()
