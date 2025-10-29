require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

async function checkSupabaseTables() {
  try {
    console.log('🔍 Vérification des tables Supabase...\n')
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('❌ Configuration Supabase incomplète')
      return
    }
    
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Vérifier les tables principales
    const tables = [
      { name: 'User', table: 'User' },
      { name: 'Profile', table: 'Profile' },
      { name: 'Link', table: 'Link' },
      { name: 'Race', table: 'Race' },
      { name: 'Sponsor', table: 'Sponsor' },
      { name: 'Affiliate', table: 'Affiliate' },
      { name: 'ReferralCode', table: 'ReferralCode' },
      { name: 'Commission', table: 'Commission' }
    ]
    
    console.log('📋 Vérification des tables:')
    
    for (const { name, table } of tables) {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select('*', { count: 'exact' })
          .limit(1)
        
        if (error) {
          console.log(`   ❌ ${name}: Erreur - ${error.message}`)
        } else {
          console.log(`   ✅ ${name}: ${count || 0} enregistrements`)
        }
      } catch (err) {
        console.log(`   ⚠️  ${name}: Table non trouvée ou erreur`)
      }
    }
    
    console.log('\n💡 Pour voir vos données:')
    console.log('1. Allez dans le Dashboard Supabase')
    console.log('2. Cliquez sur "Table Editor" dans le menu de gauche')
    console.log('3. Sélectionnez une table pour voir les données')
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  }
}

checkSupabaseTables()
