require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')

async function testDatabaseConnection() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔍 Test de connexion à la base de données...\n')
    
    // Test de connexion basique
    await prisma.$connect()
    console.log('✅ Connexion à la base de données réussie!')
    
    // Test des tables principales
    const userCount = await prisma.user.count()
    const profileCount = await prisma.profile.count()
    
    console.log(`\n📊 Données dans la base :`)
    console.log(`   👤 Utilisateurs: ${userCount}`)
    console.log(`   🏃 Profils: ${profileCount}`)
    
    if (userCount > 0) {
      const users = await prisma.user.findMany({
        take: 3,
        include: { profile: true },
        orderBy: { createdAt: 'desc' }
      })
      
      console.log('\n👥 Derniers utilisateurs :')
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email} (${user.name})`)
        if (user.profile) {
          console.log(`      Username: ${user.profile.username}`)
          console.log(`      Plan: ${user.profile.plan}`)
        }
        console.log(`      Créé: ${user.createdAt.toLocaleDateString()}`)
        console.log('      ──────────────────────────────────────')
      })
    }
    
    console.log('\n🎉 Base de données fonctionnelle!')
    
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error.message)
    console.error('\n🔧 Vérifiez :')
    console.error('   1. Que DATABASE_URL est correct dans .env.local')
    console.error('   2. Que la base de données Supabase est accessible')
    console.error('   3. Que les migrations Prisma sont à jour')
  } finally {
    await prisma.$disconnect()
  }
}

testDatabaseConnection()