# 🔄 Migration vers Supabase Auth - Guide Complet

## ✅ Ce qui a été fait

### 1. Suppression de NextAuth.js
- ✅ Supprimé `next-auth` et `@auth/prisma-adapter`
- ✅ Supprimé les fichiers `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`
- ✅ Supprimé `app/next-auth.d.ts`

### 2. Installation de Supabase Auth
- ✅ Installé `@supabase/supabase-js`, `@supabase/ssr`
- ✅ Créé `lib/supabase-auth.ts` pour la configuration
- ✅ Créé `components/providers/supabase-provider.tsx`

### 3. Mise à jour des pages d'authentification
- ✅ Page de connexion (`app/(auth)/login/page.tsx`)
- ✅ Page d'inscription (`app/(auth)/signup/page.tsx`)
- ✅ Layout du dashboard (`app/(dashboard)/layout.tsx`)
- ✅ Wrapper du dashboard (`components/ui-pro/dashboard-layout-wrapper.tsx`)

### 4. Middleware de protection
- ✅ Mis à jour `middleware.ts` pour Supabase Auth
- ✅ Protection des routes `/dashboard`
- ✅ Redirection automatique

## 🚀 Prochaines étapes

### 1. Activer Supabase Auth dans le Dashboard

1. **Allez sur** : https://supabase.com/dashboard/project/ioyklugzwavjyondimwd
2. **Cliquez sur "Authentication"** dans le menu de gauche
3. **Allez dans "Settings"** > "Auth"
4. **Configurez** :
   - **Site URL** : `http://localhost:3001` (pour le dev)
   - **Redirect URLs** : `http://localhost:3001/dashboard`
   - **Email confirmation** : Désactivé pour le développement

### 2. Migrer les utilisateurs existants

```bash
node scripts/migrate-to-supabase-auth.js
```

**⚠️ ATTENTION** : Cette migration va :
- Créer les utilisateurs dans Supabase Auth
- Supprimer les anciens utilisateurs de la table `User`
- Les utilisateurs devront réinitialiser leur mot de passe

### 3. Tester la nouvelle authentification

1. **Redémarrez le serveur** :
   ```bash
   pkill -f "next dev"
   npx next dev -p 3001
   ```

2. **Testez l'inscription** :
   - Allez sur http://localhost:3001/signup
   - Créez un nouveau compte
   - Vérifiez dans Supabase Dashboard > Authentication

3. **Testez la connexion** :
   - Allez sur http://localhost:3001/login
   - Connectez-vous avec le nouveau compte

## 🔧 Configuration Supabase

### Variables d'environnement requises

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://ioyklugzwavjyondimwd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Base de données (pour Prisma)
DATABASE_URL=postgresql://postgres:password@db.ioyklugzwavjyondimwd.supabase.co:5432/postgres
```

### Tables Supabase nécessaires

Les tables suivantes doivent exister dans Supabase :
- `Profile` - Profils utilisateurs
- `User` - (supprimée après migration)
- `Account` - (supprimée après migration)
- `Session` - (supprimée après migration)

## 📊 Avantages de Supabase Auth

1. **Gestion centralisée** : Tous les utilisateurs dans Supabase Dashboard
2. **Sécurité renforcée** : Gestion des sessions, tokens, etc.
3. **Fonctionnalités avancées** : OAuth, MFA, etc.
4. **Intégration native** : Avec le reste de l'écosystème Supabase

## 🧪 Tests à effectuer

### Test 1 : Inscription
```bash
# Créer un nouveau compte
curl -X POST http://localhost:3001/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test","username":"test","sport":"running"}'
```

### Test 2 : Connexion
```bash
# Se connecter
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

### Test 3 : Vérification dans Supabase
1. Allez sur Supabase Dashboard > Authentication
2. Vérifiez que les utilisateurs apparaissent
3. Testez la connexion via l'interface

## 🚨 Points d'attention

1. **Migration des données** : Sauvegardez avant de migrer
2. **Mots de passe** : Les utilisateurs devront les réinitialiser
3. **Sessions actives** : Toutes les sessions seront invalidées
4. **Tests complets** : Testez toutes les fonctionnalités après migration

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs du serveur
2. Vérifiez la configuration Supabase
3. Testez avec un nouvel utilisateur
4. Consultez la documentation Supabase Auth
