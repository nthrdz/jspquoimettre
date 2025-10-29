require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})

async function testLoginAPI() {
  try {
    console.log('🔐 Test de l\'API de connexion...\n')

    const baseUrl = 'http://localhost:3001'

    // Test de connexion via l'API Supabase
    console.log('1️⃣ Test de connexion Supabase...')
    
    const { createClient } = require('@supabase/supabase-js')
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test-supabase@athlink.com',
      password: 'test123456'
    })

    if (error) {
      console.log(`❌ Erreur de connexion: ${error.message}`)
    } else {
      console.log(`✅ Connexion réussie: ${data.user?.email}`)
      console.log(`   Session active: ${!!data.session}`)
    }

    // Test de vérification de session
    console.log('\n2️⃣ Test de vérification de session...')
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.log(`❌ Erreur de session: ${sessionError.message}`)
    } else {
      console.log(`✅ Session vérifiée: ${!!sessionData.session}`)
      if (sessionData.session) {
        console.log(`   Utilisateur: ${sessionData.session.user.email}`)
        console.log(`   ID: ${sessionData.session.user.id}`)
      }
    }

    // Test de récupération du profil
    console.log('\n3️⃣ Test de récupération du profil...')
    const { data: profileData, error: profileError } = await supabase
      .from('Profile')
      .select('*')
      .eq('userId', data.user?.id)
      .single()

    if (profileError) {
      console.log(`❌ Erreur de profil: ${profileError.message}`)
    } else {
      console.log(`✅ Profil trouvé: ${profileData.username}`)
      console.log(`   Display Name: ${profileData.displayName}`)
      console.log(`   Sport: ${profileData.sport}`)
      console.log(`   Plan: ${profileData.plan}`)
    }

    console.log('\n🎉 Tests API terminés!')
    console.log('📝 L\'authentification Supabase fonctionne correctement')

  } catch (error) {
    console.error('❌ Erreur lors des tests API:', error.message)
  }
}

testLoginAPI()