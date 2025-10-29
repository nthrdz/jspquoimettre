require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkDataLocation() {
  try {
    console.log('🔍 Vérification de l\'emplacement des données...\n')
    
    console.log('📊 Configuration actuelle:')
    console.log(`   DATABASE_URL: ${process.env.DATABASE_URL}`)
    console.log(`   Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`)
    console.log('')
    
    // Test de connexion
    console.log('🔗 Test de connexion...')
    await prisma.$connect()
    console.log('✅ Connexion réussie!')
    
    // Vérifier les données
    console.log('\n📋 Données dans la base actuelle:')
    
    const userCount = await prisma.user.count()
    console.log(`   👤 Utilisateurs: ${userCount}`)
    
    if (userCount > 0) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true
        }
      })
      
      console.log('\n👥 Détails des utilisateurs:')
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email} (${user.name}) - ${user.createdAt}`)
      })
    }
    
    const profileCount = await prisma.profile.count()
    console.log(`   🏃 Profils: ${profileCount}`)
    
    const linkCount = await prisma.link.count()
    console.log(`   🔗 Liens: ${linkCount}`)
    
    const raceCount = await prisma.race.count()
    console.log(`   🏁 Courses: ${raceCount}`)
    
    const sponsorCount = await prisma.sponsor.count()
    console.log(`   💼 Sponsors: ${sponsorCount}`)
    
    console.log('\n💡 Analyse:')
    if (process.env.DATABASE_URL?.includes('supabase.co')) {
      console.log('   ✅ Vous utilisez déjà Supabase comme base de données')
      console.log('   📍 Vos données sont sur Supabase')
    } else {
      console.log('   ⚠️  Vous utilisez une base PostgreSQL externe')
      console.log('   📍 Vos données ne sont PAS sur Supabase')
      console.log('   🔄 Migration vers Supabase nécessaire')
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkDataLocation()
