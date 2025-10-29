#!/usr/bin/env node

/**
 * Script de test pour le système d'affiliation
 * Usage: node scripts/test-affiliation.js
 */

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testAffiliationSystem() {
  console.log('🧪 Test du système d\'affiliation...\n')

  try {
    // 1. Créer un utilisateur de test
    console.log('1️⃣ Création d\'un utilisateur de test...')
    const testUser = await prisma.user.create({
      data: {
        email: 'affiliate-test@example.com',
        name: 'Test Affiliate',
        password: 'test123'
      }
    })
    console.log('✅ Utilisateur créé:', testUser.email)

    // 2. Créer un affilié
    console.log('\n2️⃣ Création d\'un affilié...')
    const affiliate = await prisma.affiliate.create({
      data: {
        userId: testUser.id,
        companyName: 'Test Company',
        website: 'https://test.com',
        description: 'Affilié de test',
        status: 'ACTIVE',
        commissionType: 'PERCENTAGE',
        commissionRate: 15.0
      }
    })
    console.log('✅ Affilié créé:', affiliate.id)

    // 3. Créer un code de parrainage
    console.log('\n3️⃣ Création d\'un code de parrainage...')
    const referralCode = await prisma.referralCode.create({
      data: {
        affiliateId: affiliate.id,
        code: 'TEST2024',
        name: 'Code Test 2024',
        description: 'Code de test pour 2024',
        discountType: 'PERCENTAGE',
        discountValue: 20.0,
        maxUses: 100
      }
    })
    console.log('✅ Code de parrainage créé:', referralCode.code)

    // 4. Simuler une utilisation du code
    console.log('\n4️⃣ Simulation d\'une utilisation du code...')
    const referral = await prisma.referral.create({
      data: {
        referralCodeId: referralCode.id,
        email: 'customer@example.com',
        ipAddress: '127.0.0.1',
        userAgent: 'Test Browser'
      }
    })
    console.log('✅ Référence créée:', referral.id)

    // 5. Simuler une conversion (achat)
    console.log('\n5️⃣ Simulation d\'une conversion...')
    await prisma.referral.update({
      where: { id: referral.id },
      data: {
        converted: true,
        convertedAt: new Date(),
        subscriptionId: 'sub_test123',
        commissionAmount: 4.35, // 15% de 29€
        commissionStatus: 'PENDING'
      }
    })
    console.log('✅ Conversion simulée')

    // 6. Créer une commission
    console.log('\n6️⃣ Création d\'une commission...')
    const commission = await prisma.commission.create({
      data: {
        affiliateId: affiliate.id,
        amount: 4.35,
        currency: 'EUR',
        status: 'PENDING',
        description: 'Commission pour référence TEST2024',
        metadata: {
          subscriptionId: 'sub_test123',
          referralId: referral.id,
          originalAmount: 29.0
        }
      }
    })
    console.log('✅ Commission créée:', commission.id)

    // 7. Mettre à jour les statistiques de l'affilié
    console.log('\n7️⃣ Mise à jour des statistiques...')
    await prisma.affiliate.update({
      where: { id: affiliate.id },
      data: {
        totalReferrals: { increment: 1 },
        totalCommissions: { increment: 4.35 }
      }
    })
    console.log('✅ Statistiques mises à jour')

    // 8. Afficher les résultats
    console.log('\n📊 Résultats du test:')
    const finalAffiliate = await prisma.affiliate.findUnique({
      where: { id: affiliate.id },
      include: {
        referralCodes: true,
        commissions: true
      }
    })

    console.log(`- Affilié: ${finalAffiliate.userId}`)
    console.log(`- Codes créés: ${finalAffiliate.referralCodes.length}`)
    console.log(`- Commissions: ${finalAffiliate.commissions.length}`)
    console.log(`- Total références: ${finalAffiliate.totalReferrals}`)
    console.log(`- Total commissions: ${finalAffiliate.totalCommissions}€`)

    console.log('\n🎉 Test du système d\'affiliation réussi !')

  } catch (error) {
    console.error('❌ Erreur lors du test:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Nettoyer les données de test
async function cleanupTestData() {
  console.log('\n🧹 Nettoyage des données de test...')
  
  try {
    // Supprimer dans l'ordre inverse des dépendances
    await prisma.commission.deleteMany({
      where: { description: { contains: 'Commission pour référence TEST2024' } }
    })
    
    await prisma.referral.deleteMany({
      where: { email: 'customer@example.com' }
    })
    
    await prisma.referralCode.deleteMany({
      where: { code: 'TEST2024' }
    })
    
    await prisma.affiliate.deleteMany({
      where: { companyName: 'Test Company' }
    })
    
    await prisma.user.deleteMany({
      where: { email: 'affiliate-test@example.com' }
    })
    
    console.log('✅ Données de test nettoyées')
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
  }
}

// Exécuter le test
if (process.argv.includes('--cleanup')) {
  cleanupTestData().then(() => process.exit(0))
} else {
  testAffiliationSystem().then(() => process.exit(0))
}
