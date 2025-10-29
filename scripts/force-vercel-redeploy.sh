#!/bin/bash

echo "🚀 Forçage du redéploiement Vercel"
echo "=================================="

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Exécutez ce script depuis la racine du projet."
    exit 1
fi

echo "📦 Installation des dépendances..."
npm install

echo "🔧 Génération du client Prisma..."
npx prisma generate

echo "🏗️ Build de l'application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build réussi !"
    echo ""
    echo "📋 Instructions pour Vercel :"
    echo "1. Allez sur https://vercel.com/dashboard"
    echo "2. Sélectionnez votre projet Athlink"
    echo "3. Allez dans 'Deployments'"
    echo "4. Cliquez sur 'Redeploy' sur le dernier déploiement"
    echo "5. Attendez que le build se termine"
    echo ""
    echo "🌐 Votre application sera disponible sur https://athlink.fr"
    echo ""
    echo "🔧 Configuration Vercel requise :"
    echo "- Build Command: npm run build"
    echo "- Install Command: npm install && npx prisma generate"
    echo "- Output Directory: .next"
else
    echo "❌ Erreur lors du build. Vérifiez les logs ci-dessus."
    exit 1
fi
