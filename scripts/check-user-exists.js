require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')

async function checkUserExists() {
  const prisma = new PrismaClient()
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    console.log('🔍 Vérification de l\'existence de l\'utilisateur...\n')

    const userId = 'e1e20e84-818c-41af-b962-66ace7167295'

    // Vérifier dans Supabase Auth
    console.log('1️⃣ Vérification dans Supabase Auth...')
    const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId)
    
    if (authError) {
      console.log(`❌ Utilisateur non trouvé dans Supabase Auth: ${authError.message}`)
    } else {
      console.log(`✅ Utilisateur trouvé dans Supabase Auth: ${authUser.user.email}`)
    }

    // Vérifier dans la table User (Prisma)
    console.log('\n2️⃣ Vérification dans la table User...')
    const dbUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!dbUser) {
      console.log(`❌ Utilisateur non trouvé dans la table User`)
      console.log('💡 Il faut créer l\'utilisateur dans la table User pour la contrainte de clé étrangère')
    } else {
      console.log(`✅ Utilisateur trouvé dans la table User: ${dbUser.email}`)
    }

    // Vérifier les profils existants
    console.log('\n3️⃣ Vérification des profils existants...')
    const profiles = await prisma.profile.findMany()
    console.log(`📊 ${profiles.length} profils trouvés`)
    
    profiles.forEach(profile => {
      console.log(`   - ${profile.username} (${profile.userId})`)
    })

    console.log('\n💡 Solution: Créer l\'utilisateur dans la table User d\'abord')

  } catch (error) {
    console.error('❌ Erreur lors de la vérification:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

checkUserExists()
