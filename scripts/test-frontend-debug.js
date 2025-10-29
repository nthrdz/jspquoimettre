require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testFrontendDebug() {
  try {
    console.log('🔍 Debug du frontend...\n')

    // Test 1: Vérifier que la page d'inscription se charge
    console.log('🌐 Test 1: Chargement de la page d\'inscription...')
    const signupPageResponse = await fetch('http://localhost:3001/signup')
    
    if (!signupPageResponse.ok) {
      console.log(`❌ Page d'inscription inaccessible: ${signupPageResponse.status}`)
      return
    }

    const signupPageHtml = await signupPageResponse.text()
    console.log('✅ Page d\'inscription accessible')

    // Vérifier la présence d'éléments clés
    const hasForm = signupPageHtml.includes('<form')
    const hasNameInput = signupPageHtml.includes('name="name"')
    const hasEmailInput = signupPageHtml.includes('name="email"')
    const hasPasswordInput = signupPageHtml.includes('name="password"')
    const hasUsernameInput = signupPageHtml.includes('name="username"')
    const hasSportInput = signupPageHtml.includes('name="sport"')
    const hasSubmitButton = signupPageHtml.includes('type="submit"') || signupPageHtml.includes('Créer mon profil')

    console.log('\n📋 Éléments du formulaire:')
    console.log(`   Form: ${hasForm ? '✅' : '❌'}`)
    console.log(`   Name input: ${hasNameInput ? '✅' : '❌'}`)
    console.log(`   Email input: ${hasEmailInput ? '✅' : '❌'}`)
    console.log(`   Password input: ${hasPasswordInput ? '✅' : '❌'}`)
    console.log(`   Username input: ${hasUsernameInput ? '✅' : '❌'}`)
    console.log(`   Sport input: ${hasSportInput ? '✅' : '❌'}`)
    console.log(`   Submit button: ${hasSubmitButton ? '✅' : '❌'}`)

    // Vérifier la présence de scripts
    const hasReactHookForm = signupPageHtml.includes('react-hook-form')
    const hasZodResolver = signupPageHtml.includes('zod-resolvers')
    const hasToast = signupPageHtml.includes('sonner')

    console.log('\n📦 Scripts chargés:')
    console.log(`   React Hook Form: ${hasReactHookForm ? '✅' : '❌'}`)
    console.log(`   Zod Resolver: ${hasZodResolver ? '✅' : '❌'}`)
    console.log(`   Toast: ${hasToast ? '✅' : '❌'}`)

    // Test 2: Vérifier la page de connexion
    console.log('\n🌐 Test 2: Chargement de la page de connexion...')
    const loginPageResponse = await fetch('http://localhost:3001/login')
    
    if (!loginPageResponse.ok) {
      console.log(`❌ Page de connexion inaccessible: ${loginPageResponse.status}`)
      return
    }

    const loginPageHtml = await loginPageResponse.text()
    console.log('✅ Page de connexion accessible')

    // Vérifier la présence d'éléments clés
    const hasLoginForm = loginPageHtml.includes('<form')
    const hasLoginEmailInput = loginPageHtml.includes('name="email"')
    const hasLoginPasswordInput = loginPageHtml.includes('name="password"')
    const hasLoginSubmitButton = loginPageHtml.includes('type="submit"') || loginPageHtml.includes('Se connecter')

    console.log('\n📋 Éléments du formulaire de connexion:')
    console.log(`   Form: ${hasLoginForm ? '✅' : '❌'}`)
    console.log(`   Email input: ${hasLoginEmailInput ? '✅' : '❌'}`)
    console.log(`   Password input: ${hasLoginPasswordInput ? '✅' : '❌'}`)
    console.log(`   Submit button: ${hasLoginSubmitButton ? '✅' : '❌'}`)

    // Test 3: Vérifier les APIs
    console.log('\n🔗 Test 3: Vérification des APIs...')
    
    // Test API signup
    const signupApiResponse = await fetch('http://localhost:3001/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123456',
        name: 'Test',
        username: 'test',
        sport: 'Course à pied'
      })
    })
    
    console.log(`   API Signup: ${signupApiResponse.status === 201 ? '✅' : '❌'} (${signupApiResponse.status})`)

    // Test API login
    const loginApiResponse = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123456'
      })
    })
    
    console.log(`   API Login: ${loginApiResponse.status === 200 ? '✅' : '❌'} (${loginApiResponse.status})`)

    console.log('\n🎉 Debug du frontend terminé!')
    console.log('\n💡 Si tous les éléments sont ✅, le problème pourrait être:')
    console.log('   1. Erreur JavaScript dans le navigateur')
    console.log('   2. Problème de validation côté client')
    console.log('   3. Problème de redirection après soumission')
    console.log('   4. Problème de gestion des erreurs')

  } catch (error) {
    console.error('❌ Erreur lors du debug:', error.message)
  }
}

testFrontendDebug()
