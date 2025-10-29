require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testSignupFinal() {
  try {
    console.log('🧪 Test final de l\'inscription...\n')

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

    console.log('\n🚀 Test de l\'API d\'inscription...')
    const response = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser)
    })

    if (response.ok) {
      const data = await response.json()
      console.log('✅ Inscription réussie!')
      console.log(`   User ID: ${data.user.id}`)
      console.log(`   Email: ${data.user.email}`)
      console.log(`   Username: ${data.user.username}`)
    } else {
      const errorData = await response.json()
      console.log('❌ Erreur d\'inscription:')
      console.log(`   Status: ${response.status}`)
      console.log(`   Error: ${errorData.error}`)
    }

    console.log('\n🌐 Test de la page web...')
    const pageResponse = await fetch('http://localhost:3001/signup')
    if (pageResponse.ok) {
      console.log('✅ Page d\'inscription accessible')
    } else {
      console.log('❌ Page d\'inscription inaccessible')
    }

    console.log('\n🎉 Test terminé!')
    console.log('\n📝 Instructions:')
    console.log('1. Allez sur http://localhost:3001/signup')
    console.log('2. Remplissez le formulaire avec des données valides')
    console.log('3. Cliquez sur "Créer mon profil"')
    console.log('4. Vérifiez que vous êtes redirigé vers /login')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testSignupFinal()
