require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')

async function fixProfileForeignKeys() {
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
    console.log('🔧 Correction des clés étrangères des profils...\n')

    // Récupérer tous les profils
    const profiles = await prisma.profile.findMany()
    console.log(`📊 ${profiles.length} profils trouvés`)

    // Récupérer tous les utilisateurs Supabase Auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    if (authError) {
      console.log('❌ Erreur lors de la récupération des utilisateurs Supabase:', authError.message)
      return
    }

    console.log(`📊 ${authUsers.users.length} utilisateurs Supabase trouvés`)

    // Créer un mapping email -> ID Supabase
    const emailToSupabaseId = {}
    authUsers.users.forEach(user => {
      emailToSupabaseId[user.email] = user.id
    })

    // Mettre à jour les profils avec les nouveaux IDs
    for (const profile of profiles) {
      // Trouver l'utilisateur correspondant par email
      const user = await prisma.user.findUnique({
        where: { id: profile.userId }
      })

      if (user && emailToSupabaseId[user.email]) {
        const newUserId = emailToSupabaseId[user.email]
        console.log(`🔄 Mise à jour du profil ${profile.username} avec l'ID Supabase ${newUserId}`)
        
        await prisma.profile.update({
          where: { id: profile.id },
          data: { userId: newUserId }
        })
        
        console.log(`✅ Profil ${profile.username} mis à jour`)
      } else {
        console.log(`⚠️ Utilisateur non trouvé pour le profil ${profile.username}`)
      }
    }

    // Maintenant supprimer les anciens utilisateurs
    console.log('\n🗑️ Suppression des anciens utilisateurs...')
    const oldUsers = await prisma.user.findMany()
    for (const user of oldUsers) {
      await prisma.user.delete({
        where: { id: user.id }
      })
      console.log(`✅ Utilisateur ${user.email} supprimé`)
    }

    console.log('\n🎉 Correction terminée!')
    console.log('📝 Vérifiez maintenant dans Supabase Dashboard > Authentication')

  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

fixProfileForeignKeys()
