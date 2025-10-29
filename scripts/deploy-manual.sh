#!/bin/bash

# Script de déploiement manuel pour Vercel
echo "🚀 Déploiement manuel Athlink SaaS sur Vercel"
echo "=============================================="

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
    echo "📋 Prochaines étapes :"
    echo "1. Allez sur https://vercel.com/dashboard"
    echo "2. Sélectionnez votre projet Athlink"
    echo "3. Allez dans Settings → Environment Variables"
    echo "4. Ajoutez toutes les variables listées dans DEPLOYMENT_GUIDE.md"
    echo "5. Redéployez votre projet"
    echo ""
    echo "🌐 Votre application sera disponible sur https://athlink.fr"
else
    echo "❌ Erreur lors du build. Vérifiez les logs ci-dessus."
    exit 1
fi
