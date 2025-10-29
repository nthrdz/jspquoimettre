require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

async function exportAllData() {
  try {
    console.log('📤 Export complet de toutes les données...\n')
    
    // Exporter toutes les données avec leurs relations
    const users = await prisma.user.findMany({
      include: {
        profile: true,
        affiliate: true,
        referrals: true
      }
    })
    
    const links = await prisma.link.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })
    
    const races = await prisma.race.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })
    
    const sponsors = await prisma.sponsor.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    })
    
    // Exporter les données d'affiliation si elles existent
    let affiliates = []
    let referralCodes = []
    let referrals = []
    let commissions = []
    
    try {
      affiliates = await prisma.affiliate.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          }
        }
      })
    } catch (e) {
      console.log('⚠️  Table Affiliate non trouvée')
    }
    
    try {
      referralCodes = await prisma.referralCode.findMany({
        include: {
          affiliate: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true
                }
              }
            }
          }
        }
      })
    } catch (e) {
      console.log('⚠️  Table ReferralCode non trouvée')
    }
    
    try {
      referrals = await prisma.referral.findMany({
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true
            }
          },
          referralCode: {
            include: {
              affiliate: {
                include: {
                  user: {
                    select: {
                      id: true,
                      email: true,
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      })
    } catch (e) {
      console.log('⚠️  Table Referral non trouvée')
    }
    
    try {
      commissions = await prisma.commission.findMany({
        include: {
          affiliate: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true
                }
              }
            }
          }
        }
      })
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
    fs.writeFileSync('complete-data-export.json', JSON.stringify(exportData, null, 2))
    
    console.log('📊 Données exportées:')
    console.log(`   👤 Utilisateurs: ${users.length}`)
    console.log(`   🔗 Liens: ${links.length}`)
    console.log(`   🏁 Courses: ${races.length}`)
    console.log(`   💼 Sponsors: ${sponsors.length}`)
    console.log(`   🤝 Affiliés: ${affiliates.length}`)
    console.log(`   🎫 Codes de parrainage: ${referralCodes.length}`)
    console.log(`   📝 Références: ${referrals.length}`)
    console.log(`   💰 Commissions: ${commissions.length}`)
    
    console.log('\n✅ Export complet sauvegardé dans: complete-data-export.json')
    
    return exportData
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'export:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

exportAllData()
