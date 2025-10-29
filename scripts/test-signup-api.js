require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testSignupAPI() {
  try {
    console.log('🧪 Test de l\'API d\'inscription...\n')
    
    const testData = {
      email: "test-api@example.com",
      password: "test123456",
      name: "Test API",
      username: "testapi",
      sport: "course à pied"
    }
    
    console.log('📤 Données envoyées:', JSON.stringify(testData, null, 2))
    
    const response = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })
    
    const data = await response.json()
    
    console.log(`\n📊 Réponse (${response.status}):`)
    console.log(JSON.stringify(data, null, 2))
    
    if (response.ok) {
      console.log('\n✅ Inscription réussie!')
    } else {
      console.log('\n❌ Erreur d\'inscription')
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testSignupAPI()
