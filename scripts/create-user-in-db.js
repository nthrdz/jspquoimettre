require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')

async function createUserInDb() {
  const prisma = new PrismaClient()

  try {
    console.log('👤 Création de l\'utilisateur dans la table User...\n')

    const userId = 'e1e20e84-818c-41af-b962-66ace7167295'
    const email = 'test-supabase@athlink.com'
    const name = 'Test Supabase'

    // Créer l'utilisateur dans la table User
    const user = await prisma.user.create({
      data: {
        id: userId,
        email: email,
        name: name,
        emailVerified: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    console.log(`✅ Utilisateur créé dans la table User:`)
    console.log(`   ID: ${user.id}`)
    console.log(`   Email: ${user.email}`)
    console.log(`   Name: ${user.name}`)

    // Maintenant créer le profil
    console.log('\n👤 Création du profil...')
    const profile = await prisma.profile.create({
      data: {
        userId: userId,
        username: 'testsupabase',
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

    console.log('\n🎉 Utilisateur et profil créés!')
    console.log('📝 Vous pouvez maintenant tester la connexion complète')

  } catch (error) {
    console.error('❌ Erreur lors de la création:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

createUserInDb()
