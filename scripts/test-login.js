require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')
const { compare } = require('bcryptjs')

async function testLogin() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔐 Test de connexion avec les identifiants...\n')
    
    const email = 'llllolrdz@gmail.com'
    const password = 'Nathan141102!'
    
    console.log(`📧 Email: ${email}`)
    console.log(`🔑 Mot de passe: ${password}`)
    
    // Rechercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
      include: { profile: true }
    })
    
    if (!user) {
      console.log('❌ Utilisateur non trouvé')
      return
    }
    
    console.log(`✅ Utilisateur trouvé: ${user.name}`)
    console.log(`   ID: ${user.id}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Mot de passe hashé: ${user.password ? 'Oui' : 'Non'}`)
    
    if (user.profile) {
      console.log(`   Username: ${user.profile.username}`)
      console.log(`   Plan: ${user.profile.plan}`)
    }
    
    // Tester le mot de passe
    if (user.password) {
      const isPasswordValid = await compare(password, user.password)
      console.log(`\n🔐 Test du mot de passe: ${isPasswordValid ? '✅ Valide' : '❌ Invalide'}`)
      
      if (isPasswordValid) {
        console.log('\n🎉 Connexion réussie!')
      } else {
        console.log('\n❌ Mot de passe incorrect')
      }
    } else {
      console.log('\n❌ Aucun mot de passe défini pour cet utilisateur')
    }
    
  } catch (error) {
    console.error('❌ Erreur lors du test de connexion:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testLogin()