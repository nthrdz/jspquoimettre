require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

async function simpleExport() {
  try {
    console.log('📤 Export simple de toutes les données...\n')
    
    // Exporter chaque table séparément
    const users = await prisma.user.findMany()
    const profiles = await prisma.profile.findMany()
    const links = await prisma.link.findMany()
    const races = await prisma.race.findMany()
    const sponsors = await prisma.sponsor.findMany()
    
    // Tables d'affiliation (peuvent ne pas exister)
    let affiliates = []
    let referralCodes = []
    let referrals = []
    let commissions = []
    
    try {
      affiliates = await prisma.affiliate.findMany()
    } catch (e) {
      console.log('⚠️  Table Affiliate non trouvée')
    }
    
    try {
      referralCodes = await prisma.referralCode.findMany()
    } catch (e) {
      console.log('⚠️  Table ReferralCode non trouvée')
    }
    
    try {
      referrals = await prisma.referral.findMany()
    } catch (e) {
      console.log('⚠️  Table Referral non trouvée')
    }
    
    try {
      commissions = await prisma.commission.findMany()
    } catch (e) {
      console.log('⚠️  Table Commission non trouvée')
    }
    
    const exportData = {
      metadata: {
        exportedAt: new Date().toISOString(),
        source: 'PostgreSQL via Prisma',
        version: '1.0'
      },
      data: {
        users,
        profiles,
        links,
        races,
        sponsors,
        affiliates,
        referralCodes,
        referrals,
        commissions
      },
      stats: {
        users: users.length,
        profiles: profiles.length,
        links: links.length,
        races: races.length,
        sponsors: sponsors.length,
        affiliates: affiliates.length,
        referralCodes: referralCodes.length,
        referrals: referrals.length,
        commissions: commissions.length
      }
    }
    
    // Sauvegarder dans un fichier
    fs.writeFileSync('simple-data-export.json', JSON.stringify(exportData, null, 2))
    
    console.log('📊 Données exportées:')
    console.log(`   👤 Utilisateurs: ${users.length}`)
    console.log(`   🏃 Profils: ${profiles.length}`)
    console.log(`   🔗 Liens: ${links.length}`)
    console.log(`   🏁 Courses: ${races.length}`)
    console.log(`   💼 Sponsors: ${sponsors.length}`)
    console.log(`   🤝 Affiliés: ${affiliates.length}`)
    console.log(`   🎫 Codes de parrainage: ${referralCodes.length}`)
    console.log(`   📝 Références: ${referrals.length}`)
    console.log(`   💰 Commissions: ${commissions.length}`)
    
    console.log('\n✅ Export sauvegardé dans: simple-data-export.json')
    
    return exportData
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'export:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

simpleExport()
