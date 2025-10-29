require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { createClient } = require('@supabase/supabase-js')

async function testSupabaseAuth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  try {
    console.log('🧪 Test de l\'authentification Supabase...\n')

    // Test 1: Créer un utilisateur de test
    console.log('1️⃣ Test de création d\'utilisateur...')
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: 'test-supabase@athlink.com',
      password: 'test123456',
      options: {
        data: {
          name: 'Test Supabase',
          username: 'testsupabase',
          sport: 'running'
        }
      }
    })

    if (signUpError) {
      console.log(`❌ Erreur lors de l'inscription: ${signUpError.message}`)
    } else {
      console.log(`✅ Utilisateur créé: ${signUpData.user?.email}`)
      console.log(`   ID: ${signUpData.user?.id}`)
    }

    // Test 2: Se connecter
    console.log('\n2️⃣ Test de connexion...')
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'test-supabase@athlink.com',
      password: 'test123456'
    })

    if (signInError) {
      console.log(`❌ Erreur lors de la connexion: ${signInError.message}`)
    } else {
      console.log(`✅ Connexion réussie: ${signInData.user?.email}`)
      console.log(`   Session active: ${!!signInData.session}`)
    }

    // Test 3: Vérifier la session
    console.log('\n3️⃣ Test de vérification de session...')
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.log(`❌ Erreur lors de la vérification de session: ${sessionError.message}`)
    } else {
      console.log(`✅ Session vérifiée: ${!!sessionData.session}`)
      if (sessionData.session) {
        console.log(`   Utilisateur: ${sessionData.session.user.email}`)
      }
    }

    // Test 4: Se déconnecter
    console.log('\n4️⃣ Test de déconnexion...')
    const { error: signOutError } = await supabase.auth.signOut()

    if (signOutError) {
      console.log(`❌ Erreur lors de la déconnexion: ${signOutError.message}`)
    } else {
      console.log(`✅ Déconnexion réussie`)
    }

    console.log('\n🎉 Tests terminés!')
    console.log('\n📝 Prochaines étapes:')
    console.log('1. Allez sur http://localhost:3001/signup')
    console.log('2. Créez un nouveau compte')
    console.log('3. Vérifiez dans Supabase Dashboard > Authentication')
    console.log('4. Testez la connexion sur http://localhost:3001/login')

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.message)
  }
}

testSupabaseAuth()
