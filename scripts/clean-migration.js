require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')

async function cleanMigration() {
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
    console.log('🧹 Nettoyage de la migration...\n')

    // 1. Supprimer tous les anciens utilisateurs de la table User
    console.log('🗑️ Suppression des anciens utilisateurs...')
    const oldUsers = await prisma.user.findMany()
    console.log(`📊 ${oldUsers.length} anciens utilisateurs à supprimer`)

    for (const user of oldUsers) {
      await prisma.user.delete({
        where: { id: user.id }
      })
      console.log(`✅ Utilisateur ${user.email} supprimé`)
    }

    // 2. Vérifier les utilisateurs Supabase Auth
    console.log('\n🔍 Vérification des utilisateurs Supabase Auth...')
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    if (authError) {
      console.log('❌ Erreur:', authError.message)
      return
    }

    console.log(`📊 ${authUsers.users.length} utilisateurs dans Supabase Auth:`)
    authUsers.users.forEach(user => {
      console.log(`   - ${user.email} (${user.id})`)
    })

    // 3. Mettre à jour les profils avec les IDs Supabase
    console.log('\n🔄 Mise à jour des profils...')
    const profiles = await prisma.profile.findMany()
    
    for (const profile of profiles) {
      // Trouver l'utilisateur Supabase correspondant par email
      const supabaseUser = authUsers.users.find(u => {
        // Chercher par email dans les métadonnées ou par correspondance
        return u.email === 'llllolrdz@gmail.com' && profile.username === 'nthrdz'
      })

      if (supabaseUser) {
        console.log(`🔄 Mise à jour du profil ${profile.username} avec l'ID Supabase`)
        await prisma.profile.update({
          where: { id: profile.id },
          data: { userId: supabaseUser.id }
        })
        console.log(`✅ Profil ${profile.username} mis à jour`)
      } else {
        console.log(`⚠️ Utilisateur Supabase non trouvé pour le profil ${profile.username}`)
      }
    }

    console.log('\n🎉 Nettoyage terminé!')
    console.log('📝 Vérifiez maintenant dans Supabase Dashboard > Authentication')

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

cleanMigration()
