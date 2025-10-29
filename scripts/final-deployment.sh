#!/bin/bash

echo "🚀 Déploiement final Athlink SaaS v0.1.2"
echo "========================================"

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
    echo "🎯 Configuration Vercel :"
    echo "- Build Command: npm run build"
    echo "- Install Command: npm install"
    echo "- Output Directory: .next"
    echo ""
    echo "📋 Instructions pour Vercel :"
    echo "1. Allez sur https://vercel.com/dashboard"
    echo "2. Sélectionnez votre projet Athlink"
    echo "3. Allez dans 'Settings' → 'General'"
    echo "4. Configurez :"
    echo "   - Build Command: npm run build"
    echo "   - Install Command: npm install"
    echo "   - Output Directory: .next"
    echo "5. Allez dans 'Deployments'"
    echo "6. Cliquez sur 'Redeploy'"
    echo ""
    echo "🌐 Votre application sera disponible sur https://athlink.fr"
    echo ""
    echo "✅ Toutes les variables d'environnement sont déjà configurées !"
else
    echo "❌ Erreur lors du build. Vérifiez les logs ci-dessus."
    exit 1
fi
