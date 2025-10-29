const fs = require('fs')

// Instructions pour créer un nouveau projet Supabase
function createNewSupabaseProject() {
  console.log('🚀 Instructions pour créer un nouveau projet Supabase:\n')
  
  console.log('1. 🌐 Allez sur https://supabase.com/dashboard')
  console.log('2. 🔐 Connectez-vous avec votre compte')
  console.log('3. ➕ Cliquez sur "New Project"')
  console.log('4. 📝 Remplissez les informations:')
  console.log('   - Organization: Votre organisation')
  console.log('   - Project Name: "athlink-saas"')
  console.log('   - Database Password: [Générez un mot de passe fort]')
  console.log('   - Region: Europe West (Paris) ou plus proche')
  console.log('5. ⏳ Attendez la création du projet (2-3 minutes)')
  console.log('6. 📋 Copiez les informations suivantes:')
  console.log('   - Project URL')
  console.log('   - Anon Key')
  console.log('   - Service Role Key')
  console.log('   - Database URL')
  
  console.log('\n📝 Template pour .env.local:')
  console.log('```')
  console.log('# Nouveau projet Supabase')
  console.log('DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres')
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_ID].supabase.co')
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]')
  console.log('SUPABASE_SERVICE_ROLE_KEY=[SERVICE_ROLE_KEY]')
  console.log('```')
  
  console.log('\n🔄 Une fois le projet créé, exécutez:')
  console.log('   node scripts/migrate-to-new-supabase.js')
  
  // Créer un fichier d'instructions
  const instructions = `
# Migration vers nouveau projet Supabase

## Étapes à suivre:

1. Créer un nouveau projet Supabase
2. Mettre à jour .env.local avec les nouvelles clés
3. Exécuter: npx prisma db push
4. Importer les données avec le script de migration

## Données à migrer:
- 2 utilisateurs
- 2 profils  
- 2 liens
- 3 courses
- 2 sponsors

## Fichier d'export: simple-data-export.json
`
  
  fs.writeFileSync('MIGRATION_INSTRUCTIONS.md', instructions)
  console.log('\n📄 Instructions sauvegardées dans: MIGRATION_INSTRUCTIONS.md')
}

createNewSupabaseProject()
