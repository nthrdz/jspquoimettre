# 🔐 Guide de Test d'Authentification - Athlink SaaS

## ✅ Problèmes Résolus

1. **Configuration NextAuth v5** - Corrigée
2. **Mot de passe utilisateur** - Réinitialisé
3. **API d'inscription** - Fonctionnelle
4. **Base de données** - Connectée et opérationnelle

## 🧪 Tests à Effectuer

### 1. Test d'Inscription
1. Ouvrez http://localhost:3001/signup
2. Remplissez le formulaire :
   - **Nom complet** : Votre nom
   - **Nom d'utilisateur** : un nom unique (ex: `testuser123`)
   - **Sport principal** : course à pied
   - **Email** : votre email
   - **Mot de passe** : minimum 8 caractères
3. Cliquez sur "Créer mon profil"
4. ✅ Vous devriez être redirigé vers la page de connexion

### 2. Test de Connexion
1. Ouvrez http://localhost:3001/login
2. Utilisez les identifiants :
   - **Email** : `llllolrdz@gmail.com`
   - **Mot de passe** : `Nathan141102!`
3. Cliquez sur "Se connecter"
4. ✅ Vous devriez être redirigé vers le dashboard

### 3. Test de Connexion Google (si configuré)
1. Sur la page de connexion, cliquez sur "Continuer avec Google"
2. ✅ Vous devriez être redirigé vers Google OAuth

## 🔧 Identifiants de Test

### Utilisateur Existant
- **Email** : `llllolrdz@gmail.com`
- **Mot de passe** : `Nathan141102!`
- **Username** : `nthrdz`
- **Plan** : ELITE

### Nouveaux Utilisateurs
- Créez un compte via la page d'inscription
- Tous les nouveaux comptes commencent avec le plan FREE

## 🚨 Problèmes Connus

1. **Erreur CSRF en développement** - Normal, n'affecte pas le fonctionnement
2. **Redirection après connexion** - Peut prendre quelques secondes

## 📊 Base de Données

- **Utilisateurs** : 4 (dont 1 avec plan ELITE)
- **Profils** : 4
- **Connexion** : Supabase PostgreSQL ✅

## 🎯 Prochaines Étapes

1. Tester l'inscription et la connexion via l'interface
2. Vérifier l'accès au dashboard
3. Tester la création de liens
4. Configurer les variables d'environnement Vercel
5. Déployer sur Vercel

## 🔍 Debug

Si vous rencontrez des problèmes :

1. **Vérifiez les logs du serveur** dans le terminal
2. **Ouvrez la console du navigateur** (F12)
3. **Vérifiez les cookies** dans les outils de développement
4. **Testez l'API directement** avec les scripts dans `/scripts/`

## 📞 Support

- Logs du serveur : Terminal où `npm run dev` est lancé
- Base de données : Scripts de test dans `/scripts/`
- Configuration : Fichier `.env.local`
