require('dotenv-flow').config({
  path: './',
  default_node_env: 'development',
  silent: true
})
const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')

async function associateProfiles() {
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
    console.log('🔗 Association des profils aux utilisateurs Supabase...\n')

    // Récupérer tous les profils
    const profiles = await prisma.profile.findMany()
    console.log(`📊 ${profiles.length} profils trouvés`)

    // Récupérer tous les utilisateurs Supabase Auth
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()
    if (authError) {
      console.log('❌ Erreur:', authError.message)
      return
    }

    console.log(`📊 ${authUsers.users.length} utilisateurs Supabase trouvés`)

    // Mapping manuel basé sur les emails connus
    const emailToSupabaseId = {
      'llllolrdz@gmail.com': '2f1c14f7-656a-485f-86d5-6dba9eda3c46',
      'test@athlink.com': 'b4716129-aa29-4a4d-8969-755db64d3f75',
      'unique@example.com': '988560e6-b1c0-4dee-9d3e-e9d9083c41',
      'test-api@example.com': '78b41980-4d81-4d5a-bcf8-050ea4f0b9bd',
      'test-complete@example.com': '7e0b23f6-c60c-4d83-be17-421c44369f98'
    }

    // Mettre à jour les profils
    for (const profile of profiles) {
      console.log(`\n👤 Traitement du profil: ${profile.username}`)
      
      // Chercher l'utilisateur correspondant par email
      let supabaseUserId = null
      
      // Essayer de trouver par email dans les métadonnées
      for (const user of authUsers.users) {
        if (user.user_metadata?.username === profile.username) {
          supabaseUserId = user.id
          console.log(`   ✅ Trouvé par username: ${user.email}`)
          break
        }
      }
      
      // Si pas trouvé, utiliser le mapping manuel
      if (!supabaseUserId) {
        // Chercher par email dans le mapping
        for (const [email, id] of Object.entries(emailToSupabaseId)) {
          const user = authUsers.users.find(u => u.email === email)
          if (user && user.id === id) {
            supabaseUserId = id
            console.log(`   ✅ Trouvé par mapping: ${email}`)
            break
          }
        }
      }

      if (supabaseUserId) {
        try {
          await prisma.profile.update({
            where: { id: profile.id },
            data: { userId: supabaseUserId }
          })
          console.log(`   ✅ Profil ${profile.username} associé à l'utilisateur Supabase`)
        } catch (error) {
          console.log(`   ❌ Erreur lors de la mise à jour: ${error.message}`)
        }
      } else {
        console.log(`   ⚠️ Utilisateur Supabase non trouvé pour le profil ${profile.username}`)
      }
    }

    console.log('\n🎉 Association terminée!')
    console.log('📝 Vérifiez maintenant dans Supabase Dashboard > Authentication')

  } catch (error) {
    console.error('❌ Erreur lors de l\'association:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

associateProfiles()
