#!/bin/bash

echo "🚀 Déploiement complet Athlink SaaS v0.1.2"
echo "=========================================="

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
    echo "🎯 SOLUTION DÉFINITIVE :"
    echo "========================"
    echo ""
    echo "1. SUPPRIMEZ le projet Vercel actuel :"
    echo "   - Allez sur https://vercel.com/dashboard"
    echo "   - Sélectionnez votre projet Athlink"
    echo "   - Allez dans 'Settings' → 'General'"
    echo "   - Faites défiler vers le bas et cliquez sur 'Delete Project'"
    echo ""
    echo "2. RECRÉEZ le projet Vercel :"
    echo "   - Cliquez sur 'New Project'"
    echo "   - Sélectionnez 'Import Git Repository'"
    echo "   - Choisissez votre repository GitHub"
    echo "   - Configurez :"
    echo "     * Project Name: athlink"
    echo "     * Framework Preset: Next.js"
    echo "     * Build Command: npm run build"
    echo "     * Install Command: npm install"
    echo "     * Output Directory: .next"
    echo ""
    echo "3. CONFIGUREZ les variables d'environnement :"
    echo "   - Allez dans 'Settings' → 'Environment Variables'"
    echo "   - Ajoutez toutes les variables listées dans DEPLOYMENT_GUIDE.md"
    echo ""
    echo "4. DÉPLOYEZ :"
    echo "   - Cliquez sur 'Deploy'"
    echo "   - Attendez que le build se termine"
    echo ""
    echo "🌐 Votre application sera disponible sur https://athlink.fr"
    echo ""
    echo "✅ Cette méthode garantit que Vercel utilise la nouvelle configuration !"
else
    echo "❌ Erreur lors du build. Vérifiez les logs ci-dessus."
    exit 1
fi
