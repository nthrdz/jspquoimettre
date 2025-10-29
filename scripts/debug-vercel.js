// Script pour déboguer les variables d'environnement Vercel
console.log('🔍 Variables d\'environnement disponibles:');
console.log('=====================================');

const requiredVars = [
  'AUTH_SECRET',
  'AUTH_URL', 
  'DATABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
  'TEST_EMAIL',
  'NODE_ENV',
  'NEXT_PUBLIC_APP_URL'
];

let missingVars = [];
let presentVars = [];

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    presentVars.push(varName);
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    missingVars.push(varName);
    console.log(`❌ ${varName}: MANQUANT`);
  }
});

console.log('\n📊 Résumé:');
console.log(`✅ Variables présentes: ${presentVars.length}/${requiredVars.length}`);
console.log(`❌ Variables manquantes: ${missingVars.length}`);

if (missingVars.length > 0) {
  console.log('\n🚨 Variables manquantes:');
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
}

// Test de connexion à la base de données
console.log('\n🗄️ Test de connexion à la base de données...');
try {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();
  
  prisma.$connect().then(() => {
    console.log('✅ Connexion à la base de données réussie');
    return prisma.$disconnect();
  }).then(() => {
    console.log('✅ Déconnexion réussie');
  }).catch((error) => {
    console.log('❌ Erreur de connexion à la base de données:', error.message);
  });
} catch (error) {
  console.log('❌ Erreur lors du test de base de données:', error.message);
}
