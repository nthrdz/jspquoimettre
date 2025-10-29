require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { createClient } = require('@supabase/supabase-js')

async function setupSupabaseAuth() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  try {
    console.log('🔧 Configuration de Supabase Auth...\n')

    // Test de connexion
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log('❌ Erreur de connexion Supabase:', error.message)
      return
    }

    console.log('✅ Connexion Supabase réussie')

    // Vérifier la configuration actuelle
    console.log('\n📊 Configuration actuelle:')
    console.log(`   URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
    console.log(`   Anon Key: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Défini' : '❌ Non défini'}`)
    console.log(`   Service Key: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Défini' : '❌ Non défini'}`)

    console.log('\n🔧 Instructions pour configurer Supabase Auth:')
    console.log('1. 🌐 Allez sur https://supabase.com/dashboard')
    console.log('2. 🔐 Connectez-vous avec votre compte')
    console.log(`3. 📁 Sélectionnez le projet: ${process.env.NEXT_PUBLIC_SUPABASE_URL.split('.')[0].replace('https://', '')}`)
    console.log('4. 🔑 Allez dans "Authentication" > "Settings"')
    console.log('5. ⚙️ Configurez les paramètres suivants:')
    console.log('   - Site URL: http://localhost:3001')
    console.log('   - Redirect URLs: http://localhost:3001/dashboard')
    console.log('   - Email confirmation: DÉSACTIVÉ (pour le développement)')
    console.log('   - Enable email confirmations: OFF')
    console.log('6. 💾 Sauvegardez les modifications')

    console.log('\n🔑 Pour migrer les utilisateurs, vous aurez besoin de la SERVICE_ROLE_KEY')
    console.log('   Allez dans "Project Settings" > "API" pour la récupérer')

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message)
  }
}

setupSupabaseAuth()
