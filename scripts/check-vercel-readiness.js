require('dotenv').config({ path: '.env.local' })

function checkVercelReadiness() {
  console.log('🔍 Vérification de la préparation pour Vercel...\n')
  
  const requiredVars = [
    'AUTH_SECRET',
    'AUTH_URL',
    'DATABASE_URL',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED',
    'RESEND_API_KEY',
    'RESEND_FROM_EMAIL',
    'NODE_ENV',
    'NEXT_PUBLIC_APP_URL'
  ]
  
  console.log('📋 Variables d\'environnement requises:')
  let allPresent = true
  
  requiredVars.forEach(varName => {
    const value = process.env[varName]
    if (value) {
      console.log(`   ✅ ${varName}: ${value.substring(0, 20)}...`)
    } else {
      console.log(`   ❌ ${varName}: MANQUANTE`)
      allPresent = false
    }
  })
  
  console.log('')
  
  if (allPresent) {
    console.log('🎉 Toutes les variables sont présentes !')
    console.log('✅ Votre application est prête pour Vercel')
  } else {
    console.log('⚠️  Certaines variables sont manquantes')
    console.log('📝 Ajoutez les variables manquantes dans Vercel')
  }
  
  console.log('\n📋 Configuration Vercel recommandée:')
  console.log('   Build Command: npx prisma generate && next build')
  console.log('   Install Command: npm install')
  console.log('   Output Directory: .next')
  console.log('   Framework: Next.js')
  
  console.log('\n🌐 URL de déploiement:')
  console.log('   AUTH_URL: https://votre-projet.vercel.app')
  console.log('   NEXT_PUBLIC_APP_URL: https://votre-projet.vercel.app')
  console.log('   (Remplacez "votre-projet" par le nom de votre projet Vercel)')
  
  console.log('\n📖 Guide complet: VERCEL_CONFIGURATION_COMPLETE.md')
}

checkVercelReadiness()
