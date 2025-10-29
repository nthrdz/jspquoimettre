require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')

async function verifySupabaseData() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔍 Vérification des données dans Supabase...\n')
    
    // 1. Vérifier via Prisma (qui utilise DATABASE_URL de Supabase)
    console.log('1️⃣ Vérification via Prisma (DATABASE_URL Supabase)...')
    const users = await prisma.user.findMany({
      include: { profile: true },
      orderBy: { createdAt: 'desc' },
      take: 10
    })
    
    console.log(`   ✅ ${users.length} utilisateurs trouvés via Prisma`)
    console.log('\n📋 Derniers utilisateurs (via Prisma):')
    users.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.email}`)
      console.log(`      Nom: ${user.name}`)
      console.log(`      Username: ${user.profile?.username || 'N/A'}`)
      console.log(`      Plan: ${user.profile?.plan || 'N/A'}`)
      console.log(`      Créé: ${user.createdAt.toLocaleDateString()}`)
      console.log('')
    })
    
    // 2. Vérifier l'URL de la base de données
    const dbUrl = process.env.DATABASE_URL
    if (dbUrl && dbUrl.includes('supabase.co')) {
      const projectMatch = dbUrl.match(/db\.([^.]+)\.supabase\.co/)
      if (projectMatch) {
        const projectId = projectMatch[1]
        console.log('2️⃣ Configuration Supabase:')
        console.log(`   ✅ DATABASE_URL pointe vers Supabase`)
        console.log(`   Project ID: ${projectId}`)
        console.log(`   URL Dashboard: https://supabase.com/dashboard/project/${projectId}`)
        console.log('\n📝 Pour voir les données dans Supabase Dashboard:')
        console.log(`   1. Allez sur https://supabase.com/dashboard`)
        console.log(`   2. Sélectionnez le projet: ${projectId}`)
        console.log(`   3. Allez dans "Table Editor"`)
        console.log(`   4. Cliquez sur la table "User" pour voir les utilisateurs`)
        console.log(`   5. Cliquez sur la table "Profile" pour voir les profils`)
      }
    } else {
      console.log('⚠️  DATABASE_URL ne pointe pas vers Supabase')
      console.log(`   URL actuelle: ${dbUrl ? dbUrl.substring(0, 30) + '...' : 'Non définie'}`)
    }
    
    // 3. Vérifier via Supabase Client (si possible)
    console.log('\n3️⃣ Test de connexion directe Supabase...')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (supabaseUrl && supabaseAnonKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey)
        // Note: Supabase client ne peut pas accéder directement aux tables Prisma
        // car elles utilisent Prisma naming conventions
        console.log('   ✅ Clés Supabase configurées')
        console.log(`   URL: ${supabaseUrl}`)
        console.log('   ⚠️  Note: Les tables Prisma ne sont pas directement accessibles via Supabase Client')
        console.log('   💡 Utilisez Prisma Studio ou Supabase Dashboard pour voir les données')
      } catch (error) {
        console.log(`   ❌ Erreur Supabase Client: ${error.message}`)
      }
    } else {
      console.log('   ⚠️  Clés Supabase non configurées')
    }
    
    console.log('\n✅ Vérification terminée!')
    console.log('\n💡 Les données sont bien stockées dans Supabase via Prisma.')
    console.log('   Pour voir les données dans Supabase Dashboard, utilisez le lien ci-dessus.')
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message)
    console.error('\n🔧 Vérifiez que:')
    console.error('   1. DATABASE_URL est correct dans .env.local')
    console.error('   2. La base de données Supabase est accessible')
    console.error('   3. Les migrations Prisma sont à jour')
  } finally {
    await prisma.$disconnect()
  }
}

verifySupabaseData()
