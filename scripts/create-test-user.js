require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUser() {
  try {
    console.log('👤 Création d\'un utilisateur de test...\n')
    
    const email = 'test@athlink.com'
    const password = 'test123'
    const name = 'Test User'
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    })
    
    if (existingUser) {
      console.log('⚠️  Utilisateur existe déjà, suppression...')
      await prisma.user.delete({
        where: { id: existingUser.id }
      })
    }
    
    // Hasher le mot de passe
    const hashedPassword = await hash(password, 12)
    
    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        emailVerified: new Date()
      }
    })
    
    console.log('✅ Utilisateur créé:')
    console.log(`   ID: ${user.id}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Nom: ${user.name}`)
    console.log(`   Mot de passe: ${password}`)
    
    // Créer le profil
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        username: 'testuser',
        displayName: name,
        sport: 'RUNNING',
        plan: 'FREE',
        isPublic: true
      }
    })
    
    console.log('✅ Profil créé:')
    console.log(`   Username: ${profile.username}`)
    console.log(`   Plan: ${profile.plan}`)
    
    console.log('\n🎉 Utilisateur de test créé avec succès!')
    console.log('📧 Email: test@athlink.com')
    console.log('🔑 Mot de passe: test123')
    
  } catch (error) {
    console.error('❌ Erreur lors de la création:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUser()
