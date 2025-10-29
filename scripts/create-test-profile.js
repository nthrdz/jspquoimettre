require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')

async function createTestProfile() {
  const prisma = new PrismaClient()

  try {
    console.log('👤 Création du profil pour l\'utilisateur de test...\n')

    const userId = 'e1e20e84-818c-41af-b962-66ace7167295'
    const username = 'testsupabase'

    // Vérifier si le profil existe déjà
    const existingProfile = await prisma.profile.findUnique({
      where: { username }
    })

    if (existingProfile) {
      console.log(`⚠️ Le profil ${username} existe déjà`)
      return
    }

    // Créer le profil
    const profile = await prisma.profile.create({
      data: {
        userId: userId,
        username: username,
        displayName: 'Test Supabase',
        sport: 'RUNNING',
        plan: 'FREE',
        isPublic: true,
        stats: {
          followers: 0,
          following: 0,
          posts: 0
        }
      }
    })

    console.log(`✅ Profil créé:`)
    console.log(`   Username: ${profile.username}`)
    console.log(`   Display Name: ${profile.displayName}`)
    console.log(`   Sport: ${profile.sport}`)
    console.log(`   Plan: ${profile.plan}`)
    console.log(`   User ID: ${profile.userId}`)

    console.log('\n🎉 Profil de test prêt!')
    console.log('📝 Vous pouvez maintenant tester la connexion complète')

  } catch (error) {
    console.error('❌ Erreur lors de la création du profil:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

createTestProfile()
