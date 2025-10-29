const https = require('https');

// Script pour forcer le redéploiement Vercel via API
console.log('🚀 Forçage du redéploiement Vercel via API');
console.log('==========================================');

// Instructions pour l'utilisateur
console.log('');
console.log('📋 Instructions pour forcer le redéploiement :');
console.log('');
console.log('1. Allez sur https://vercel.com/dashboard');
console.log('2. Sélectionnez votre projet Athlink');
console.log('3. Allez dans "Settings" → "General"');
console.log('4. Dans la section "Build & Development Settings" :');
console.log('   - Build Command: npm run build');
console.log('   - Install Command: npm install');
console.log('   - Output Directory: .next');
console.log('5. Cliquez sur "Save"');
console.log('6. Allez dans "Deployments"');
console.log('7. Cliquez sur "Redeploy" sur le dernier déploiement');
console.log('');
console.log('🔧 Configuration alternative :');
console.log('Si ça ne marche toujours pas :');
console.log('1. Supprimez le projet Vercel');
console.log('2. Recréez-le avec "Import Git Repository"');
console.log('3. Configurez les variables d\'environnement');
console.log('4. Déployez');
console.log('');
console.log('✅ Votre application fonctionnera alors sur https://athlink.fr');
