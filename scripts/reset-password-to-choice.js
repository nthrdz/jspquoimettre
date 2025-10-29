require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')
const readline = require('readline')

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function resetPasswordToChoice() {
  try {
    console.log('🔐 Réinitialisation du mot de passe...\n')
    
    const email = 'llllolrdz@gmail.com'
    const newPassword = await question('🔑 Nouveau mot de passe (minimum 8 caractères): ')
    
    if (newPassword.length < 8) {
      console.log('❌ Le mot de passe doit contenir au moins 8 caractères')
      process.exit(1)
    }
    
    // Chercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: email }
    })
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé')
      return
    }
    
    console.log('✅ Utilisateur trouvé:', user.email)
    
    // Hasher le nouveau mot de passe
    const hashedPassword = await hash(newPassword, 12)
    
    // Mettre à jour le mot de passe
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })
    
    console.log('✅ Mot de passe mis à jour!')
    console.log(`📧 Email: ${email}`)
    console.log(`🔑 Nouveau mot de passe: ${newPassword}`)
    
    console.log('\n🎉 Vous pouvez maintenant vous connecter avec:')
    console.log(`   Email: ${email}`)
    console.log(`   Mot de passe: ${newPassword}`)
    
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

resetPasswordToChoice()
