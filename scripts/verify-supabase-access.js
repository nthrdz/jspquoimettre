require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

async function verifySupabaseAccess() {
  try {
    console.log('🔍 Vérification de l\'accès Supabase...\n')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log('📊 Configuration Supabase:')
    console.log(`   URL: ${supabaseUrl}`)
    console.log(`   Anon Key: ${supabaseKey ? '✅ Défini' : '❌ Non défini'}`)
    console.log(`   Service Key: ${serviceKey ? '✅ Défini' : '❌ Non défini'}`)
    console.log('')
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Configuration Supabase incomplète')
      return
    }
    
    // Test avec la clé anonyme
    console.log('🔑 Test avec la clé anonyme...')
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    try {
      const { data: tables, error } = await supabase
        .from('User')
        .select('count')
        .limit(1)
      
      if (error) {
        console.log('❌ Erreur avec la clé anonyme:', error.message)
      } else {
        console.log('✅ Accès avec la clé anonyme réussi')
      }
    } catch (error) {
      console.log('❌ Erreur de connexion:', error.message)
    }
    
    // Test avec la clé de service
    if (serviceKey) {
      console.log('\n🔑 Test avec la clé de service...')
      const supabaseService = createClient(supabaseUrl, serviceKey)
      
      try {
        const { data: users, error } = await supabaseService
          .from('User')
          .select('*')
          .limit(5)
        
        if (error) {
          console.log('❌ Erreur avec la clé de service:', error.message)
        } else {
          console.log('✅ Accès avec la clé de service réussi')
          console.log(`   Utilisateurs trouvés: ${users?.length || 0}`)
        }
      } catch (error) {
        console.log('❌ Erreur de connexion service:', error.message)
      }
    }
    
    console.log('\n💡 Instructions:')
    console.log('1. Allez sur https://supabase.com/dashboard')
    console.log('2. Connectez-vous avec votre compte')
    console.log('3. Sélectionnez le projet: ioyklugzwavjyondimwd')
    console.log('4. Allez dans "Table Editor" pour voir vos données')
    console.log('5. Vérifiez que vous êtes dans le bon projet/organisation')
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

verifySupabaseAccess()
