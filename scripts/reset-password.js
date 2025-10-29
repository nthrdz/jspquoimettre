require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

async function resetPassword() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔐 Réinitialisation du mot de passe...\n')
    
    const email = 'llllolrdz@gmail.com'
    const newPassword = 'athlink123'
    
    console.log(`📧 Email: ${email}`)
    console.log(`🔑 Nouveau mot de passe: ${newPassword}`)
    
    // Rechercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé')
      return
    }
    
    console.log(`✅ Utilisateur trouvé: ${user.name}`)
    
    // Hasher le nouveau mot de passe
    const hashedPassword = await hash(newPassword, 12)
    
    // Mettre à jour le mot de passe
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })
    
    console.log('✅ Mot de passe mis à jour!')
    console.log('\n🎉 Vous pouvez maintenant vous connecter avec :')
    console.log(`   Email: ${email}`)
    console.log(`   Mot de passe: ${newPassword}`)
    
  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

resetPassword()