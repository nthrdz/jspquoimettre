require('dotenv').config({ path: '.env.local' })
const { PrismaClient } = require('@prisma/client')
const { z } = require('zod')

const prisma = new PrismaClient()

// Schéma de validation
const signupSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Minimum 8 caractères"),
  name: z.string().min(2, "Nom requis"),
  username: z.string()
    .min(3, "Minimum 3 caractères")
    .max(30, "Maximum 30 caractères")
    .regex(/^[a-zA-Z0-9_-]+$/, "Uniquement lettres, chiffres, - et _"),
  sport: z.string().min(1, "Sport requis")
})

async function testAuth() {
  try {
    console.log('🔍 Test de l\'authentification...\n')
    
    // Test 1: Validation des données
    console.log('1. Test de validation des données:')
    const testData = {
      email: "test@example.com",
      password: "test123456",
      name: "Test User",
      username: "testuser",
      sport: "course"
    }
    
    try {
      const validatedData = signupSchema.parse(testData)
      console.log('   ✅ Validation réussie')
      console.log('   📊 Données validées:', validatedData)
    } catch (error) {
      console.log('   ❌ Erreur de validation:', error.errors)
      return
    }
    
    // Test 2: Connexion à la base de données
    console.log('\n2. Test de connexion à la base de données:')
    try {
      await prisma.$connect()
      console.log('   ✅ Connexion réussie')
    } catch (error) {
      console.log('   ❌ Erreur de connexion:', error.message)
      return
    }
    
    // Test 3: Vérification des tables
    console.log('\n3. Vérification des tables:')
    try {
      const userCount = await prisma.user.count()
      const profileCount = await prisma.profile.count()
      console.log(`   👤 Utilisateurs: ${userCount}`)
      console.log(`   🏃 Profils: ${profileCount}`)
    } catch (error) {
      console.log('   ❌ Erreur de lecture:', error.message)
      return
    }
    
    // Test 4: Test d'inscription
    console.log('\n4. Test d\'inscription:')
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await prisma.user.findUnique({
        where: { email: testData.email }
      })
      
      if (existingUser) {
        console.log('   ⚠️  Utilisateur existe déjà, suppression...')
        await prisma.user.delete({
          where: { id: existingUser.id }
        })
      }
      
      // Créer l'utilisateur
      const { hash } = require('bcryptjs')
      const hashedPassword = await hash(testData.password, 12)
      
      const user = await prisma.user.create({
        data: {
          email: testData.email,
          name: testData.name,
          password: hashedPassword,
          profile: {
            create: {
              username: testData.username,
              displayName: testData.name,
              sport: "RUNNING",
              plan: "FREE"
            }
          }
        },
        include: {
          profile: true
        }
      })
      
      console.log('   ✅ Utilisateur créé avec succès!')
      console.log('   📊 Utilisateur:', {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.profile?.username
      })
      
    } catch (error) {
      console.log('   ❌ Erreur d\'inscription:', error.message)
    }
    
    // Test 5: Test de connexion
    console.log('\n5. Test de connexion:')
    try {
      const { compare } = require('bcryptjs')
      const user = await prisma.user.findUnique({
        where: { email: testData.email }
      })
      
      if (user && user.password) {
        const isValid = await compare(testData.password, user.password)
        if (isValid) {
          console.log('   ✅ Connexion réussie!')
        } else {
          console.log('   ❌ Mot de passe incorrect')
        }
      } else {
        console.log('   ❌ Utilisateur non trouvé')
      }
    } catch (error) {
      console.log('   ❌ Erreur de connexion:', error.message)
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testAuth()
