#!/bin/bash

# 🚀 Script de déploiement Vercel pour Athlink SaaS
# Usage: ./scripts/deploy-vercel.sh

set -e

echo "🚀 Déploiement d'Athlink sur Vercel..."

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    log_error "Ce script doit être exécuté depuis la racine du projet"
    exit 1
fi

# 1. Vérifier que Git est propre
log_info "Vérification de l'état Git..."
if [ -n "$(git status --porcelain)" ]; then
    log_warning "Des changements non commités détectés"
    read -p "Voulez-vous les commiter avant le déploiement ? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "feat: Deploy to Vercel with Supabase integration"
    else
        log_error "Déploiement annulé"
        exit 1
    fi
fi

# 2. Pousser vers GitHub
log_info "Poussée vers GitHub..."
git push origin main
log_success "Code poussé vers GitHub"

# 3. Vérifier que Vercel CLI est installé
log_info "Vérification de Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    log_warning "Vercel CLI non installé, installation..."
    npm install -g vercel
fi

# 4. Se connecter à Vercel (si nécessaire)
log_info "Vérification de la connexion Vercel..."
if ! vercel whoami &> /dev/null; then
    log_warning "Connexion à Vercel requise"
    vercel login
fi

# 5. Déployer sur Vercel
log_info "Déploiement sur Vercel..."
vercel --prod --yes

log_success "Déploiement terminé !"
log_info "Vérifiez votre application sur : https://athlink.fr"

# 6. Afficher les prochaines étapes
echo ""
echo "📋 Prochaines étapes :"
echo "1. Vérifiez les variables d'environnement sur Vercel"
echo "2. Testez l'authentification"
echo "3. Configurez Stripe Connect"
echo "4. Testez le système d'affiliation"

log_success "Script terminé !"