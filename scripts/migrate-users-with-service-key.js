require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')

async function migrateUsersWithServiceKey() {
  const prisma = new PrismaClient()
  
  // Utiliser la SERVICE_ROLE_KEY pour les opérations admin
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY, // Utiliser la clé de service
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )

  try {
    console.log('🔄 Migration des utilisateurs avec SERVICE_ROLE_KEY...\n')

    // Récupérer tous les utilisateurs existants
    const users = await prisma.user.findMany({
      include: { profile: true }
    })

    console.log(`📊 ${users.length} utilisateurs trouvés à migrer`)

    for (const user of users) {
      console.log(`\n👤 Migration de ${user.email}...`)

      try {
        // Créer l'utilisateur dans Supabase Auth avec la clé de service
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
          email: user.email,
          password: user.password || 'temp-password-123', // Mot de passe temporaire
          email_confirm: true, // Confirmer automatiquement l'email
          user_metadata: {
            name: user.name,
            username: user.profile?.username,
            sport: user.profile?.sport,
          }
        })

        if (authError) {
          console.log(`❌ Erreur Auth: ${authError.message}`)
          continue
        }

        console.log(`✅ Utilisateur créé dans Supabase Auth: ${authData.user.id}`)

        // Mettre à jour le profil avec le nouvel ID utilisateur
        if (user.profile) {
          await prisma.profile.update({
            where: { id: user.profile.id },
            data: { userId: authData.user.id }
          })
          console.log(`✅ Profil mis à jour avec le nouvel ID`)
        }

        // Supprimer l'ancien utilisateur de la table User
        await prisma.user.delete({
          where: { id: user.id }
        })
        console.log(`✅ Ancien utilisateur supprimé`)

      } catch (error) {
        console.log(`❌ Erreur lors de la migration de ${user.email}:`, error.message)
      }
    }

    console.log('\n🎉 Migration terminée!')
    console.log('\n📝 Prochaines étapes:')
    console.log('1. Vérifiez les utilisateurs dans Supabase Dashboard > Authentication')
    console.log('2. Testez la connexion avec les identifiants existants')
    console.log('3. Les utilisateurs devront réinitialiser leur mot de passe')

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

migrateUsersWithServiceKey()
