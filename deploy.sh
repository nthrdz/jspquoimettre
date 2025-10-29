#!/bin/bash

# Script de déploiement Athlink
echo "🚀 Déploiement Athlink"
echo "====================="

# Vérifier que Git est initialisé
if [ ! -d ".git" ]; then
    echo "📁 Initialisation du repository Git..."
    git init
    git branch -M main
fi

# Ajouter tous les fichiers
echo "📦 Ajout des fichiers..."
git add .

# Commit
echo "💾 Commit des changements..."
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')" || echo "Aucun changement à commiter"

# Vérifier si un remote existe
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "⚠️  Aucun remote GitHub configuré"
    echo "📋 Pour déployer sur Vercel :"
    echo "1. Créez un repository sur GitHub"
    echo "2. Exécutez : git remote add origin https://github.com/votre-username/athlink.git"
    echo "3. Exécutez : git push -u origin main"
    echo "4. Allez sur https://vercel.com et importez le repository"
    exit 1
fi

# Pousser vers GitHub
echo "⬆️  Push vers GitHub..."
git push origin main

echo ""
echo "✅ Code poussé vers GitHub !"
echo ""
echo "🚀 Prochaines étapes :"
echo "1. Allez sur https://vercel.com"
echo "2. Importez votre repository GitHub"
echo "3. Vercel déploiera automatiquement"
echo ""
echo "🔧 N'oubliez pas de configurer Supabase :"
echo "1. Créez la table 'profiles' (voir DEPLOYMENT_GUIDE.md)"
echo "2. Configurez l'authentification"
echo "3. Mettez à jour les URLs de redirection"
