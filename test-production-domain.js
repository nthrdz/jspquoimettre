// Test du domaine de production athlink.fr
console.log('🌐 Test du domaine de production athlink.fr')
console.log('==========================================')

async function testProductionDomain() {
    try {
        // Test de l'accessibilité du domaine
        console.log('1️⃣ Test d\'accessibilité du domaine...')
        
        const response = await fetch('https://athlink.fr', {
            method: 'HEAD',
            mode: 'no-cors' // Pour éviter les erreurs CORS
        })
        
        console.log('✅ Domaine athlink.fr accessible')
        
        // Test de la configuration Supabase
        console.log('2️⃣ Test de la configuration Supabase...')
        
        const SUPABASE_URL = 'https://ioyklugzwavjyondimwd.supabase.co'
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlveWtsdWd6d2F2anlvbmRpbXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5MjMyNDEsImV4cCI6MjA3NTQ5OTI0MX0.erXctfavoMVh_j_iy-uM7YPMwqktSSs1ZvS2gz9Q04w'
        
        const { createClient } = require('@supabase/supabase-js')
        const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
        
        const { data: connectionTest, error: connectionError } = await supabase
            .from('profiles')
            .select('count')
            .limit(1)
        
        if (connectionError) {
            console.log('❌ Erreur de connexion Supabase:', connectionError.message)
            return false
        }
        
        console.log('✅ Connexion Supabase réussie')
        
        console.log('')
        console.log('🎯 CONFIGURATION RECOMMANDÉE POUR SUPABASE :')
        console.log('==========================================')
        console.log('')
        console.log('📋 Dans Supabase Dashboard > URL Configuration :')
        console.log('')
        console.log('Site URL :')
        console.log('https://athlink.fr')
        console.log('')
        console.log('Redirect URLs :')
        console.log('https://athlink.fr')
        console.log('https://athlink.fr/index.html')
        console.log('https://www.athlink.fr')
        console.log('https://www.athlink.fr/index.html')
        console.log('')
        console.log('✅ Une fois configuré, votre application athlink.fr')
        console.log('   devrait fonctionner parfaitement !')
        
        return true
        
    } catch (error) {
        console.log('❌ Erreur lors du test:', error.message)
        return false
    }
}

// Exécuter le test
testProductionDomain().then(success => {
    if (success) {
        console.log('')
        console.log('🚀 Votre application athlink.fr est prête !')
        console.log('   Configurez les URLs dans Supabase et testez !')
    }
})
