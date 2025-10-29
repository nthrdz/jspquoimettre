require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const { createClient } = require('@supabase/supabase-js')

const prisma = new PrismaClient()

async function testSupabaseConnection() {
  try {
    console.log('🔍 Test de connexion Supabase...\n')
    
    // Test 1: Variables d'environnement
    console.log('1. Variables d\'environnement:')
    console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? '✅ Défini' : '❌ Non défini'}`)
    console.log(`   SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Défini' : '❌ Non défini'}`)
    console.log(`   ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Défini' : '❌ Non défini'}`)
    console.log(`   SERVICE_KEY: ${process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Défini' : '❌ Non défini'}`)
    console.log('')
    
    // Test 2: Connexion Prisma
    console.log('2. Test de connexion Prisma:')
    try {
      await prisma.$connect()
      console.log('   ✅ Connexion Prisma réussie')
      
      const userCount = await prisma.user.count()
      console.log(`   👤 Utilisateurs dans la base: ${userCount}`)
      
      if (userCount > 0) {
        const users = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true
          }
        })
        console.log('   📋 Utilisateurs:')
        users.forEach((user, index) => {
          console.log(`      ${index + 1}. ${user.email} (${user.name})`)
        })
      }
    } catch (error) {
      console.log('   ❌ Erreur Prisma:', error.message)
      return
    }
    console.log('')
    
    // Test 3: Connexion Supabase directe
    console.log('3. Test de connexion Supabase directe:')
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseKey) {
        console.log('   ❌ Configuration Supabase manquante')
        return
      }
      
      const supabase = createClient(supabaseUrl, supabaseKey)
      
      // Test simple de connexion
      const { data, error } = await supabase
        .from('User')
        .select('count')
        .limit(1)
      
      if (error) {
        console.log('   ❌ Erreur Supabase:', error.message)
      } else {
        console.log('   ✅ Connexion Supabase réussie')
      }
    } catch (error) {
      console.log('   ❌ Erreur de connexion Supabase:', error.message)
    }
    console.log('')
    
    // Test 4: Test d'authentification NextAuth
    console.log('4. Test d\'authentification NextAuth:')
    try {
      const { compare } = require('bcryptjs')
      const testEmail = 'llllolrdz@gmail.com'
      const testPassword = 'athlink123'
      
      const user = await prisma.user.findUnique({
        where: { email: testEmail }
      })
      
      if (!user) {
        console.log('   ❌ Utilisateur de test non trouvé')
        return
      }
      
      if (!user.password) {
        console.log('   ❌ Aucun mot de passe pour l\'utilisateur')
        return
      }
      
      const isValid = await compare(testPassword, user.password)
      if (isValid) {
        console.log('   ✅ Authentification NextAuth fonctionne')
        console.log('   💡 Le problème est probablement côté frontend/CSRF')
      } else {
        console.log('   ❌ Mot de passe incorrect')
      }
    } catch (error) {
      console.log('   ❌ Erreur d\'authentification:', error.message)
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testSupabaseConnection()