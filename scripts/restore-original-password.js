require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

async function restoreOriginalPassword() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔐 Restauration du mot de passe original...\n')
    
    const email = 'llllolrdz@gmail.com'
    const originalPassword = 'Nathan141102!'
    
    console.log(`📧 Email: ${email}`)
    console.log(`🔑 Mot de passe original: ${originalPassword}`)
    
    // Rechercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé')
      return
    }
    
    console.log(`✅ Utilisateur trouvé: ${user.name}`)
    
    // Hasher le mot de passe original
    const hashedPassword = await hash(originalPassword, 12)
    
    // Mettre à jour le mot de passe
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })
    
    console.log('✅ Mot de passe original restauré!')
    console.log('\n🎉 Vous pouvez maintenant vous connecter avec :')
    console.log(`   Email: ${email}`)
    console.log(`   Mot de passe: ${originalPassword}`)
    
  } catch (error) {
    console.error('❌ Erreur lors de la restauration:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

restoreOriginalPassword()
