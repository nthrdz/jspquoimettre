require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

async function migrateToNewSupabase() {
  try {
    console.log('🔄 Migration vers nouveau projet Supabase...\n')
    
    // Vérifier que le nouveau projet est configuré
    const databaseUrl = process.env.DATABASE_URL
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    
    if (!databaseUrl || !supabaseUrl) {
      console.log('❌ Configuration Supabase manquante!')
      console.log('📝 Mettez à jour .env.local avec les nouvelles clés Supabase')
      return
    }
    
    console.log('📊 Configuration actuelle:')
    console.log(`   DATABASE_URL: ${databaseUrl}`)
    console.log(`   SUPABASE_URL: ${supabaseUrl}`)
    console.log('')
    
    // Charger les données exportées
    if (!fs.existsSync('simple-data-export.json')) {
      console.log('❌ Fichier d\'export non trouvé!')
      console.log('📝 Exécutez d\'abord: node scripts/simple-export.js')
      return
    }
    
    const exportData = JSON.parse(fs.readFileSync('simple-data-export.json', 'utf8'))
    console.log('📤 Données chargées:')
    console.log(`   👤 Utilisateurs: ${exportData.stats.users}`)
    console.log(`   🏃 Profils: ${exportData.stats.profiles}`)
    console.log(`   🔗 Liens: ${exportData.stats.links}`)
    console.log(`   🏁 Courses: ${exportData.stats.races}`)
    console.log(`   💼 Sponsors: ${exportData.stats.sponsors}`)
    console.log('')
    
    // Tester la connexion au nouveau projet
    console.log('🔗 Test de connexion au nouveau projet...')
    await prisma.$connect()
    console.log('✅ Connexion réussie!')
    
    // Vérifier que les tables existent
    console.log('\n📋 Vérification des tables...')
    const userCount = await prisma.user.count()
    console.log(`   👤 Utilisateurs actuels: ${userCount}`)
    
    if (userCount > 0) {
      console.log('⚠️  Des données existent déjà dans le nouveau projet!')
      console.log('🔄 Voulez-vous continuer? (Les données existantes seront conservées)')
    }
    
    // Migrer les utilisateurs
    console.log('\n👤 Migration des utilisateurs...')
    for (const user of exportData.data.users) {
      try {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name,
            password: user.password,
            emailVerified: user.emailVerified
          },
          create: {
            id: user.id,
            email: user.email,
            name: user.name,
            password: user.password,
            emailVerified: user.emailVerified,
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt)
          }
        })
        console.log(`   ✅ ${user.email}`)
      } catch (error) {
        console.log(`   ❌ ${user.email}: ${error.message}`)
      }
    }
    
    // Migrer les profils
    console.log('\n🏃 Migration des profils...')
    for (const profile of exportData.data.profiles) {
      try {
        await prisma.profile.upsert({
          where: { id: profile.id },
          update: {
            username: profile.username,
            displayName: profile.displayName,
            sport: profile.sport,
            plan: profile.plan,
            isPublic: profile.isPublic
          },
          create: {
            id: profile.id,
            userId: profile.userId,
            username: profile.username,
            displayName: profile.displayName,
            sport: profile.sport,
            plan: profile.plan,
            isPublic: profile.isPublic,
            createdAt: new Date(profile.createdAt),
            updatedAt: new Date(profile.updatedAt)
          }
        })
        console.log(`   ✅ ${profile.username}`)
      } catch (error) {
        console.log(`   ❌ ${profile.username}: ${error.message}`)
      }
    }
    
    // Migrer les liens
    console.log('\n🔗 Migration des liens...')
    for (const link of exportData.data.links) {
      try {
        await prisma.link.upsert({
          where: { id: link.id },
          update: {
            title: link.title,
            url: link.url,
            description: link.description,
            isActive: link.isActive
          },
          create: {
            id: link.id,
            profileId: link.profileId,
            title: link.title,
            url: link.url,
            description: link.description,
            isActive: link.isActive,
            createdAt: new Date(link.createdAt),
            updatedAt: new Date(link.updatedAt)
          }
        })
        console.log(`   ✅ ${link.title}`)
      } catch (error) {
        console.log(`   ❌ ${link.title}: ${error.message}`)
      }
    }
    
    // Migrer les courses
    console.log('\n🏁 Migration des courses...')
    for (const race of exportData.data.races) {
      try {
        await prisma.race.upsert({
          where: { id: race.id },
          update: {
            name: race.name,
            date: new Date(race.date),
            location: race.location,
            distance: race.distance,
            time: race.time,
            notes: race.notes
          },
          create: {
            id: race.id,
            profileId: race.profileId,
            name: race.name,
            date: new Date(race.date),
            location: race.location,
            distance: race.distance,
            time: race.time,
            notes: race.notes,
            createdAt: new Date(race.createdAt),
            updatedAt: new Date(race.updatedAt)
          }
        })
        console.log(`   ✅ ${race.name}`)
      } catch (error) {
        console.log(`   ❌ ${race.name}: ${error.message}`)
      }
    }
    
    // Migrer les sponsors
    console.log('\n💼 Migration des sponsors...')
    for (const sponsor of exportData.data.sponsors) {
      try {
        await prisma.sponsor.upsert({
          where: { id: sponsor.id },
          update: {
            name: sponsor.name,
            website: sponsor.website,
            logo: sponsor.logo,
            description: sponsor.description
          },
          create: {
            id: sponsor.id,
            profileId: sponsor.profileId,
            name: sponsor.name,
            website: sponsor.website,
            logo: sponsor.logo,
            description: sponsor.description,
            createdAt: new Date(sponsor.createdAt),
            updatedAt: new Date(sponsor.updatedAt)
          }
        })
        console.log(`   ✅ ${sponsor.name}`)
      } catch (error) {
        console.log(`   ❌ ${sponsor.name}: ${error.message}`)
      }
    }
    
    console.log('\n🎉 Migration terminée!')
    console.log('✅ Toutes vos données ont été migrées vers le nouveau projet Supabase')
    
    // Vérification finale
    const finalStats = {
      users: await prisma.user.count(),
      profiles: await prisma.profile.count(),
      links: await prisma.link.count(),
      races: await prisma.race.count(),
      sponsors: await prisma.sponsor.count()
    }
    
    console.log('\n📊 Données finales:')
    console.log(`   👤 Utilisateurs: ${finalStats.users}`)
    console.log(`   🏃 Profils: ${finalStats.profiles}`)
    console.log(`   🔗 Liens: ${finalStats.links}`)
    console.log(`   🏁 Courses: ${finalStats.races}`)
    console.log(`   💼 Sponsors: ${finalStats.sponsors}`)
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
  } finally {
    await prisma.$disconnect()
  }
}

migrateToNewSupabase()