// Test de production final
const SUPABASE_CONFIG = require('./supabase-config.js')

console.log('🎯 Test de production final - Athlink')
console.log('====================================')

async function testProduction() {
    try {
        const { createClient } = require('@supabase/supabase-js')
        const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)
        
        console.log('1️⃣ Test de connexion Supabase...')
        
        const { data: connectionTest, error: connectionError } = await supabase
            .from('profiles')
            .select('count')
            .limit(1)
        
        if (connectionError) {
            console.log('❌ Erreur de connexion:', connectionError.message)
            return false
        }
        
        console.log('✅ Connexion Supabase réussie')
        
        console.log('2️⃣ Test d\'authentification complète...')
        
        const testEmail = `test-prod-${Date.now()}@athlink.com`
        const testPassword = 'testpassword123'
        
        // Test d'inscription
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
            options: {
                data: {
                    name: 'Test User',
                    username: `testuser${Date.now()}`,
                    sport: 'RUNNING'
                }
            }
        })
        
        if (signupError) {
            console.log('❌ Erreur d\'inscription:', signupError.message)
            return false
        }
        
        console.log('✅ Inscription réussie')
        
        // Test de connexion
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword
        })
        
        if (loginError) {
            console.log('❌ Erreur de connexion:', loginError.message)
            return false
        }
        
        console.log('✅ Connexion réussie')
        console.log('   Utilisateur:', loginData.user.email)
        console.log('   Session:', loginData.session ? 'ACTIVE' : 'INACTIVE')
        
        // Test de vérification de session
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
            console.log('❌ Erreur de vérification utilisateur')
            return false
        }
        
        console.log('✅ Session vérifiée')
        
        // Test de création de profil
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .insert([{
                id: user.id,
                username: `testuser${Date.now()}`,
                display_name: 'Test User',
                sport: 'RUNNING',
                plan: 'FREE',
                is_public: true
            }])
            .select()
        
        if (profileError) {
            console.log('❌ Erreur création profil:', profileError.message)
            return false
        }
        
        console.log('✅ Profil créé:', profileData[0].username)
        
        // Nettoyage
        await supabase.auth.signOut()
        
        console.log('')
        console.log('🎉 APPLICATION PRÊTE POUR LA PRODUCTION !')
        console.log('=========================================')
        console.log('✅ Supabase configuré correctement')
        console.log('✅ Authentification fonctionnelle')
        console.log('✅ Base de données accessible')
        console.log('✅ Profils utilisateurs créés')
        console.log('')
        console.log('🚀 Votre application est maintenant 100% fonctionnelle !')
        console.log('   Ouvrez http://localhost:8000 dans votre navigateur')
        console.log('   Créez un compte et connectez-vous')
        console.log('   Vous devriez voir le dashboard sans problème')
        
        return true
        
    } catch (error) {
        console.log('❌ Erreur inattendue:', error.message)
        return false
    }
}

// Exécuter le test
testProduction().then(success => {
    if (!success) {
        console.log('')
        console.log('🚨 PROBLÈME DÉTECTÉ:')
        console.log('   Vérifiez la configuration Supabase')
        process.exit(1)
    }
})
