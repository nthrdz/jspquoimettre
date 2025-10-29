require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testSimpleSignup() {
  try {
    console.log('🧪 Test de la page d\'inscription simplifiée...\n')

    const testUser = {
      email: `test-simple-${Date.now()}@example.com`,
      password: 'test123456',
      name: 'Test Simple',
      username: `testsimple${Date.now()}`,
      sport: 'Course à pied'
    }

    console.log('📝 Données de test:')
    console.log(`   Email: ${testUser.email}`)
    console.log(`   Username: ${testUser.username}`)
    console.log(`   Sport: ${testUser.sport}`)

    // Test 1: Vérifier que la page se charge
    console.log('\n🌐 Test 1: Chargement de la page...')
    const pageResponse = await fetch('http://localhost:3001/test-signup')
    
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
    const hasSubmitButton = pageHtml.includes('type="submit"')

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

    console.log('\n🎉 Test de la page simplifiée terminé!')
    console.log('\n📝 Instructions pour tester manuellement:')
    console.log('1. Allez sur http://localhost:3001/test-signup')
    console.log('2. Remplissez le formulaire avec des données valides')
    console.log('3. Cliquez sur "Créer mon compte"')
    console.log('4. Vérifiez que vous êtes redirigé vers /login')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testSimpleSignup()
