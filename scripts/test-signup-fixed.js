require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testSignupFixed() {
  try {
    console.log('🧪 Test de la page d\'inscription corrigée...\n')

    const testUser = {
      email: `test-fixed-${Date.now()}@example.com`,
      password: 'test123456',
      name: 'Test Fixed',
      username: `testfixed${Date.now()}`,
      sport: 'Course à pied'
    }

    console.log('📝 Données de test:')
    console.log(`   Email: ${testUser.email}`)
    console.log(`   Username: ${testUser.username}`)
    console.log(`   Sport: ${testUser.sport}`)

    // Test 1: Vérifier que la page se charge
    console.log('\n🌐 Test 1: Chargement de la page...')
    const pageResponse = await fetch('http://localhost:3001/signup')
    
    if (!pageResponse.ok) {
      console.log(`❌ Page inaccessible: ${pageResponse.status}`)
      return
    }

    const pageHtml = await pageResponse.text()
    console.log('✅ Page accessible')

    // Vérifier la présence des éléments
    const hasForm = pageHtml.includes('<form')
    const hasNameInput = pageHtml.includes('name="name"')
    const hasEmailInput = pageHtml.includes('name="email"')
    const hasPasswordInput = pageHtml.includes('name="password"')
    const hasUsernameInput = pageHtml.includes('name="username"')
    const hasSportInput = pageHtml.includes('name="sport"')
    const hasSubmitButton = pageHtml.includes('Créer mon profil')

    console.log('\n📋 Éléments du formulaire:')
    console.log(`   Formulaire: ${hasForm ? '✅' : '❌'}`)
    console.log(`   Input nom: ${hasNameInput ? '✅' : '❌'}`)
    console.log(`   Input email: ${hasEmailInput ? '✅' : '❌'}`)
    console.log(`   Input mot de passe: ${hasPasswordInput ? '✅' : '❌'}`)
    console.log(`   Input username: ${hasUsernameInput ? '✅' : '❌'}`)
    console.log(`   Input sport: ${hasSportInput ? '✅' : '❌'}`)
    console.log(`   Bouton submit: ${hasSubmitButton ? '✅' : '❌'}`)

    if (!hasForm || !hasSubmitButton) {
      console.log('❌ Formulaire mal configuré')
      return
    }

    // Test 2: Test de l'API
    console.log('\n🚀 Test 2: Test de l\'API...')
    const apiResponse = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    })

    console.log(`   Status: ${apiResponse.status}`)
    
    if (apiResponse.ok) {
      const data = await apiResponse.json()
      console.log('✅ API fonctionne!')
      console.log(`   User ID: ${data.user.id}`)
      console.log(`   Email: ${data.user.email}`)
      console.log(`   Username: ${data.user.username}`)
    } else {
      const errorData = await apiResponse.json()
      console.log('❌ Erreur API:')
      console.log(`   Error: ${errorData.error}`)
      if (errorData.details) {
        console.log(`   Details: ${JSON.stringify(errorData.details, null, 2)}`)
      }
    }

    // Test 3: Test de connexion
    console.log('\n🔐 Test 3: Test de connexion...')
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

    console.log(`   Status: ${loginResponse.status}`)
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json()
      console.log('✅ Connexion réussie!')
      console.log(`   User ID: ${loginData.user.id}`)
      console.log(`   Email: ${loginData.user.email}`)
    } else {
      const errorData = await loginResponse.json()
      console.log('❌ Erreur de connexion:')
      console.log(`   Error: ${errorData.error}`)
    }

    console.log('\n🎉 Test de la page corrigée terminé!')
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

testSignupFixed()
