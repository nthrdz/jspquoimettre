require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const { compare } = require('bcryptjs')

const prisma = new PrismaClient()

async function checkUserPassword() {
  try {
    console.log('🔍 Vérification du mot de passe de llllolrdz@gmail.com...\n')
    
    const email = 'llllolrdz@gmail.com'
    const oldPassword = 'Nathan141102!'
    const newPassword = 'athlink123'
    
    // Chercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: { profile: true }
    })
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé')
      return
    }
    
    console.log('✅ Utilisateur trouvé:')
    console.log(`   ID: ${user.id}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Nom: ${user.name}`)
    console.log(`   Username: ${user.profile?.username}`)
    console.log(`   Mot de passe hashé: ${user.password ? '✅ Présent' : '❌ Absent'}`)
    console.log('')
    
    if (!user.password) {
      console.log('❌ Aucun mot de passe défini')
      return
    }
    
    // Tester l'ancien mot de passe
    console.log('🔍 Test de l\'ancien mot de passe (Nathan141102!)...')
    try {
      const isOldPasswordValid = await compare(oldPassword, user.password)
      if (isOldPasswordValid) {
        console.log('✅ Ancien mot de passe correct!')
        console.log('💡 Vous pouvez vous connecter avec: Nathan141102!')
      } else {
        console.log('❌ Ancien mot de passe incorrect')
      }
    } catch (error) {
      console.log('❌ Erreur avec l\'ancien mot de passe:', error.message)
    }
    
    // Tester le nouveau mot de passe
    console.log('\n🔍 Test du nouveau mot de passe (athlink123)...')
    try {
      const isNewPasswordValid = await compare(newPassword, user.password)
      if (isNewPasswordValid) {
        console.log('✅ Nouveau mot de passe correct!')
        console.log('💡 Vous pouvez vous connecter avec: athlink123')
      } else {
        console.log('❌ Nouveau mot de passe incorrect')
      }
    } catch (error) {
      console.log('❌ Erreur avec le nouveau mot de passe:', error.message)
    }
    
    // Tester d'autres mots de passe possibles
    const possiblePasswords = [
      'password',
      '123456',
      'admin',
      'test',
      'athlink',
      'nthrdz',
      'Nathan141102!',
      'Nathan141102@',
      'Nathan141102#',
      'Nathan141102$'
    ]
    
    console.log('\n🔍 Test d\'autres mots de passe possibles...')
    for (const testPassword of possiblePasswords) {
      try {
        const isValid = await compare(testPassword, user.password)
        if (isValid) {
          console.log(`✅ Mot de passe correct trouvé: "${testPassword}"`)
          console.log('💡 Vous pouvez vous connecter avec ce mot de passe!')
          return
        }
      } catch (error) {
        // Ignorer les erreurs de comparaison
      }
    }
    
    console.log('❌ Aucun mot de passe correct trouvé')
    console.log('💡 Vous devez réinitialiser le mot de passe')
    
  } catch (error) {
    console.error('❌ Erreur:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkUserPassword()
