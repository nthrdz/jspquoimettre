require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { createClient } = require('@supabase/supabase-js')

async function confirmTestUser() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    console.log('✅ Confirmation de l\'utilisateur de test...\n')

    // Confirmer l'email de l'utilisateur de test
    const { data, error } = await supabase.auth.admin.updateUserById(
      'e1e20e84-818c-41af-b962-66ace7167295',
      { email_confirm: true }
    )

    if (error) {
      console.log(`❌ Erreur lors de la confirmation: ${error.message}`)
    } else {
      console.log(`✅ Email confirmé pour: ${data.user.email}`)
    }

    // Maintenant tester la connexion
    console.log('\n🔐 Test de connexion après confirmation...')
    const clientSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const { data: signInData, error: signInError } = await clientSupabase.auth.signInWithPassword({
      email: 'test-supabase@athlink.com',
      password: 'test123456'
    })

    if (signInError) {
      console.log(`❌ Erreur lors de la connexion: ${signInError.message}`)
    } else {
      console.log(`✅ Connexion réussie: ${signInData.user?.email}`)
      console.log(`   Session active: ${!!signInData.session}`)
    }

    console.log('\n🎉 Utilisateur de test prêt!')
    console.log('📝 Vous pouvez maintenant tester sur http://localhost:3001/login')

  } catch (error) {
    console.error('❌ Erreur lors de la confirmation:', error.message)
  }
}

confirmTestUser()
