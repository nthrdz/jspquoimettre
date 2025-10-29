require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testSignupForm() {
  try {
    console.log('🧪 Test du formulaire d\'inscription...\n')

    const testUser = {
      email: `test-form-${Date.now()}@example.com`,
      password: 'test123456',
      name: 'Test Form',
      username: `testform${Date.now()}`,
      sport: 'Course à pied'
    }

    console.log('📝 Données de test:')
    console.log(`   Email: ${testUser.email}`)
    console.log(`   Username: ${testUser.username}`)
    console.log(`   Sport: ${testUser.sport}`)

    // Simuler exactement ce que fait le frontend
    console.log('\n🚀 Test: Simulation du formulaire...')
    
    // Test avec validation côté client (comme le fait react-hook-form)
    const validationErrors = []
    
    if (!testUser.name || testUser.name.length < 2) {
      validationErrors.push({ field: 'name', message: 'Le nom doit contenir au moins 2 caractères' })
    }
    
    if (!testUser.username || testUser.username.length < 3) {
      validationErrors.push({ field: 'username', message: 'Le nom d\'utilisateur doit contenir au moins 3 caractères' })
    }
    
    if (!testUser.email || !testUser.email.includes('@')) {
      validationErrors.push({ field: 'email', message: 'Email invalide' })
    }
    
    if (!testUser.password || testUser.password.length < 8) {
      validationErrors.push({ field: 'password', message: 'Le mot de passe doit contenir au moins 8 caractères' })
    }
    
    if (!testUser.sport || testUser.sport.length < 2) {
      validationErrors.push({ field: 'sport', message: 'Le sport est requis' })
    }

    if (validationErrors.length > 0) {
      console.log('❌ Erreurs de validation côté client:')
      validationErrors.forEach(error => {
        console.log(`   ${error.field}: ${error.message}`)
      })
      return
    }

    console.log('✅ Validation côté client réussie')

    // Test de l'API avec les mêmes données
    console.log('\n🔗 Test: Appel API...')
    const response = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    })

    console.log(`   Status: ${response.status}`)
    console.log(`   Headers: ${JSON.stringify(Object.fromEntries(response.headers.entries()))}`)

    const responseText = await response.text()
    console.log(`   Response: ${responseText}`)

    if (response.ok) {
      const data = JSON.parse(responseText)
      console.log('✅ Inscription réussie!')
      console.log(`   User ID: ${data.user.id}`)
      console.log(`   Email: ${data.user.email}`)
      console.log(`   Username: ${data.user.username}`)
    } else {
      console.log('❌ Erreur d\'inscription:')
      try {
        const errorData = JSON.parse(responseText)
        console.log(`   Error: ${errorData.error}`)
        if (errorData.details) {
          console.log(`   Details: ${JSON.stringify(errorData.details, null, 2)}`)
        }
      } catch (e) {
        console.log(`   Raw error: ${responseText}`)
      }
    }

    console.log('\n🎉 Test du formulaire terminé!')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
    console.error('Stack:', error.stack)
  }
}

testSignupForm()
