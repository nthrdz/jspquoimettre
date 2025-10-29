require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testAuthComplete() {
  try {
    console.log('🧪 Test complet de l\'authentification...\n')

    const testUser = {
      email: `test-${Date.now()}@example.com`,
      password: 'test123456',
      name: 'Test User',
      username: `testuser${Date.now()}`,
      sport: 'Course à pied'
    }

    console.log('📝 Données de test:')
    console.log(`   Email: ${testUser.email}`)
    console.log(`   Username: ${testUser.username}`)
    console.log(`   Sport: ${testUser.sport}`)

    // Test 1: Inscription
    console.log('\n🚀 Test 1: Inscription...')
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
      return
    }

    // Test 2: Connexion
    console.log('\n🔐 Test 2: Connexion...')
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

    // Test 3: Pages web
    console.log('\n🌐 Test 3: Pages web...')
    const signupPageResponse = await fetch('http://localhost:3001/signup')
    const loginPageResponse = await fetch('http://localhost:3001/login')
    
    if (signupPageResponse.ok) {
      console.log('✅ Page d\'inscription accessible')
    } else {
      console.log('❌ Page d\'inscription inaccessible')
    }
    
    if (loginPageResponse.ok) {
      console.log('✅ Page de connexion accessible')
    } else {
      console.log('❌ Page de connexion inaccessible')
    }

    console.log('\n🎉 Test complet terminé!')
    console.log('\n📝 Instructions pour tester manuellement:')
    console.log('1. Allez sur http://localhost:3001/signup')
    console.log('2. Créez un compte avec des données valides')
    console.log('3. Allez sur http://localhost:3001/login')
    console.log('4. Connectez-vous avec vos identifiants')
    console.log('5. Vérifiez que vous êtes redirigé vers /dashboard')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testAuthComplete()
