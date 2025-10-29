require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testFrontendComplete() {
  try {
    console.log('🧪 Test complet du frontend...\n')

    // Test 1: Vérifier que les pages se chargent
    console.log('🌐 Test 1: Chargement des pages...')
    
    const signupResponse = await fetch('http://localhost:3001/signup')
    const loginResponse = await fetch('http://localhost:3001/login')
    
    console.log(`   Page inscription: ${signupResponse.ok ? '✅' : '❌'} (${signupResponse.status})`)
    console.log(`   Page connexion: ${loginResponse.ok ? '✅' : '❌'} (${loginResponse.status})`)

    if (!signupResponse.ok || !loginResponse.ok) {
      console.log('❌ Pages non accessibles')
      return
    }

    // Test 2: Vérifier les APIs
    console.log('\n🔗 Test 2: Test des APIs...')
    
    const testUser = {
      email: `test-complete-${Date.now()}@example.com`,
      password: 'test123456',
      name: 'Test Complete',
      username: `testcomplete${Date.now()}`,
      sport: 'Course à pied'
    }

    // Test inscription
    const signupApiResponse = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    })
    
    console.log(`   API Inscription: ${signupApiResponse.ok ? '✅' : '❌'} (${signupApiResponse.status})`)

    if (!signupApiResponse.ok) {
      const errorData = await signupApiResponse.json()
      console.log(`   Erreur: ${errorData.error}`)
      return
    }

    // Test connexion
    const loginApiResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      })
    })
    
    console.log(`   API Connexion: ${loginApiResponse.ok ? '✅' : '❌'} (${loginApiResponse.status})`)

    if (!loginApiResponse.ok) {
      const errorData = await loginApiResponse.json()
      console.log(`   Erreur: ${errorData.error}`)
      return
    }

    // Test 3: Vérifier le contenu des pages
    console.log('\n📋 Test 3: Contenu des pages...')
    
    const signupHtml = await signupResponse.text()
    const loginHtml = await loginResponse.text()

    // Vérifier les éléments clés de la page d'inscription
    const signupChecks = {
      'Formulaire': signupHtml.includes('<form'),
      'Input nom': signupHtml.includes('name="name"'),
      'Input email': signupHtml.includes('name="email"'),
      'Input mot de passe': signupHtml.includes('name="password"'),
      'Input username': signupHtml.includes('name="username"'),
      'Input sport': signupHtml.includes('name="sport"'),
      'Bouton submit': signupHtml.includes('Créer mon profil'),
      'React Hook Form': signupHtml.includes('react-hook-form'),
      'Zod Resolver': signupHtml.includes('zod-resolvers'),
      'Toast': signupHtml.includes('sonner')
    }

    console.log('   Page d\'inscription:')
    Object.entries(signupChecks).forEach(([key, value]) => {
      console.log(`     ${key}: ${value ? '✅' : '❌'}`)
    })

    // Vérifier les éléments clés de la page de connexion
    const loginChecks = {
      'Formulaire': loginHtml.includes('<form'),
      'Input email': loginHtml.includes('name="email"'),
      'Input mot de passe': loginHtml.includes('name="password"'),
      'Bouton submit': loginHtml.includes('Se connecter'),
      'React Hook Form': loginHtml.includes('react-hook-form'),
      'Zod Resolver': loginHtml.includes('zod-resolvers'),
      'Toast': loginHtml.includes('sonner')
    }

    console.log('   Page de connexion:')
    Object.entries(loginChecks).forEach(([key, value]) => {
      console.log(`     ${key}: ${value ? '✅' : '❌'}`)
    })

    // Test 4: Vérifier les scripts
    console.log('\n📦 Test 4: Scripts chargés...')
    
    const hasReactHookForm = signupHtml.includes('react-hook-form') || loginHtml.includes('react-hook-form')
    const hasZodResolver = signupHtml.includes('zod-resolvers') || loginHtml.includes('zod-resolvers')
    const hasToast = signupHtml.includes('sonner') || loginHtml.includes('sonner')

    console.log(`   React Hook Form: ${hasReactHookForm ? '✅' : '❌'}`)
    console.log(`   Zod Resolver: ${hasZodResolver ? '✅' : '❌'}`)
    console.log(`   Toast: ${hasToast ? '✅' : '❌'}`)

    console.log('\n🎉 Test complet terminé!')
    
    if (hasReactHookForm && hasZodResolver && hasToast) {
      console.log('\n✅ Tous les scripts sont chargés. Le problème pourrait être:')
      console.log('   1. Erreur JavaScript dans le navigateur')
      console.log('   2. Problème de validation côté client')
      console.log('   3. Problème de redirection après soumission')
      console.log('   4. Problème de gestion des erreurs')
    } else {
      console.log('\n❌ Certains scripts ne sont pas chargés. Vérifiez:')
      console.log('   1. Les dépendances dans package.json')
      console.log('   2. Les imports dans les composants')
      console.log('   3. La configuration Next.js')
    }

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message)
  }
}

testFrontendComplete()
