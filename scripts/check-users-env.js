require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkUsers() {
  try {
    console.log('🔍 Vérification des utilisateurs dans la base de données...\n')
    console.log('🔗 DATABASE_URL:', process.env.DATABASE_URL ? '✅ Défini' : '❌ Non défini')
    console.log('')
    
    const users = await prisma.user.findMany({
      include: {
        profile: true
      }
    })
    
    console.log(`📊 Nombre d'utilisateurs trouvés: ${users.length}\n`)
    
    users.forEach((user, index) => {
      console.log(`👤 Utilisateur ${index + 1}:`)
      console.log(`   ID: ${user.id}`)
      console.log(`   Email: ${user.email}`)
      console.log(`   Nom: ${user.name || 'Non défini'}`)
      console.log(`   Mot de passe: ${user.password ? '✅ Défini' : '❌ Non défini'}`)
      console.log(`   Profil: ${user.profile ? '✅ Créé' : '❌ Non créé'}`)
      if (user.profile) {
        console.log(`   Username: ${user.profile.username}`)
        console.log(`   Plan: ${user.profile.plan}`)
      }
      console.log(`   Créé le: ${user.createdAt}`)
      console.log('   ' + '─'.repeat(50))
    })
    
    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé dans la base de données!')
      console.log('💡 Vous devez d\'abord créer un compte via /signup')
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkUsers()
