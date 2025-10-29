require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testFormSubmission() {
  try {
    console.log('🧪 Test de soumission du formulaire...\n')

    const testUser = {
      email: `test-submission-${Date.now()}@example.com`,
      password: 'test123456',
      name: 'Test Submission',
      username: `testsubmission${Date.now()}`,
      sport: 'Course à pied'
    }

    console.log('📝 Données de test:')
    console.log(`   Email: ${testUser.email}`)
    console.log(`   Username: ${testUser.username}`)
    console.log(`   Sport: ${testUser.sport}`)

    // Test 1: Vérifier que la page d'inscription se charge correctement
    console.log('\n🌐 Test 1: Chargement de la page...')
    const pageResponse = await fetch('http://localhost:3001/signup')
    
    if (!pageResponse.ok) {
      console.log(`❌ Page inaccessible: ${pageResponse.status}`)
      return
    }

    const pageHtml = await pageResponse.text()
    console.log('✅ Page accessible')

    // Vérifier la présence du formulaire
    const hasForm = pageHtml.includes('<form')
    const hasSubmitButton = pageHtml.includes('Créer mon profil')
    
    console.log(`   Formulaire: ${hasForm ? '✅' : '❌'}`)
    console.log(`   Bouton submit: ${hasSubmitButton ? '✅' : '❌'}`)

    if (!hasForm || !hasSubmitButton) {
      console.log('❌ Formulaire mal configuré')
      return
    }

    // Test 2: Simuler la soumission du formulaire
    console.log('\n🚀 Test 2: Simulation de soumission...')
    
    // Simuler les données du formulaire
    const formData = new URLSearchParams()
    formData.append('name', testUser.name)
    formData.append('username', testUser.username)
    formData.append('sport', testUser.sport)
    formData.append('email', testUser.email)
    formData.append('password', testUser.password)

    // Test avec Content-Type: application/x-www-form-urlencoded (comme un vrai formulaire)
    const formResponse = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    })

    console.log(`   Status: ${formResponse.status}`)
    
    if (formResponse.ok) {
      const data = await formResponse.json()
      console.log('✅ Soumission réussie!')
      console.log(`   User ID: ${data.user.id}`)
      console.log(`   Email: ${data.user.email}`)
    } else {
      const errorText = await formResponse.text()
      console.log('❌ Erreur de soumission:')
      console.log(`   Response: ${errorText}`)
    }

    // Test 3: Test avec JSON (comme le fait le frontend)
    console.log('\n🔗 Test 3: Test avec JSON...')
    const jsonResponse = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    })

    console.log(`   Status: ${jsonResponse.status}`)
    
    if (jsonResponse.ok) {
      const data = await jsonResponse.json()
      console.log('✅ JSON soumission réussie!')
      console.log(`   User ID: ${data.user.id}`)
      console.log(`   Email: ${data.user.email}`)
    } else {
      const errorText = await jsonResponse.text()
      console.log('❌ Erreur JSON soumission:')
      console.log(`   Response: ${errorText}`)
    }

    console.log('\n🎉 Test de soumission terminé!')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testFormSubmission()
