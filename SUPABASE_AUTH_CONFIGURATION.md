# 🔧 Configuration Complète de Supabase Auth

## 📧 1. Activer l'envoi d'emails de confirmation

### Étape 1 : Aller dans les paramètres Supabase
1. **Allez sur** : https://supabase.com/dashboard/project/ioyklugzwavjyondimwd
2. **Cliquez sur "Authentication"** dans le menu de gauche
3. **Cliquez sur "Settings"** (onglet Paramètres)

### Étape 2 : Configurer les emails
1. **Dans la section "Email"** :
   - ✅ **Enable email confirmations** : `ON`
   - ✅ **Enable email change confirmations** : `ON`
   - ✅ **Enable phone confirmations** : `OFF` (optionnel)

2. **Dans "SMTP Settings"** (optionnel - pour emails personnalisés) :
   - Vous pouvez configurer votre propre serveur SMTP
   - Ou laisser Supabase gérer les emails (recommandé pour commencer)

### Étape 3 : Personnaliser les templates d'email
1. **Cliquez sur "Email Templates"**
2. **Personnalisez** :
   - **Confirm signup** : Email de confirmation d'inscription
   - **Magic Link** : Lien de connexion magique
   - **Change Email Address** : Changement d'email
   - **Reset Password** : Réinitialisation de mot de passe

## 🌐 2. Configurer les domaines autorisés

### Étape 1 : Aller dans les paramètres d'URL
1. **Dans "Authentication" > "Settings"**
2. **Section "URL Configuration"**

### Étape 2 : Configurer les URLs
```
Site URL: https://votre-domaine.com
Redirect URLs: 
  - https://votre-domaine.com/dashboard
  - https://votre-domaine.com/auth/callback
  - http://localhost:3001/dashboard (pour le développement)
  - http://localhost:3001/auth/callback (pour le développement)
```

### Étape 3 : URLs supplémentaires
```
Additional Redirect URLs:
  - https://votre-domaine.com/coaching
  - https://votre-domaine.com/galerie
  - http://localhost:3001/coaching
  - http://localhost:3001/galerie
```

## 🔐 3. Ajouter des providers OAuth

### Google OAuth

#### Étape 1 : Créer un projet Google Cloud
1. **Allez sur** : https://console.cloud.google.com/
2. **Créez un nouveau projet** ou sélectionnez un existant
3. **Activez l'API Google+** :
   - APIs & Services > Library
   - Recherchez "Google+ API" et activez-la

#### Étape 2 : Créer des identifiants OAuth
1. **APIs & Services > Credentials**
2. **Create Credentials > OAuth 2.0 Client IDs**
3. **Application type** : Web application
4. **Authorized redirect URIs** :
   ```
   https://ioyklugzwavjyondimwd.supabase.co/auth/v1/callback
   ```

#### Étape 3 : Configurer dans Supabase
1. **Supabase Dashboard > Authentication > Providers**
2. **Activez Google** :
   - ✅ **Enable Google provider**
   - **Client ID** : Votre Google Client ID
   - **Client Secret** : Votre Google Client Secret

### GitHub OAuth (optionnel)

#### Étape 1 : Créer une OAuth App GitHub
1. **Allez sur** : https://github.com/settings/developers
2. **New OAuth App**
3. **Authorization callback URL** :
   ```
   https://ioyklugzwavjyondimwd.supabase.co/auth/v1/callback
   ```

#### Étape 2 : Configurer dans Supabase
1. **Supabase Dashboard > Authentication > Providers**
2. **Activez GitHub** :
   - ✅ **Enable GitHub provider**
   - **Client ID** : Votre GitHub Client ID
   - **Client Secret** : Votre GitHub Client Secret

### Discord OAuth (optionnel)

#### Étape 1 : Créer une application Discord
1. **Allez sur** : https://discord.com/developers/applications
2. **New Application**
3. **OAuth2 > Redirects** :
   ```
   https://ioyklugzwavjyondimwd.supabase.co/auth/v1/callback
   ```

#### Étape 2 : Configurer dans Supabase
1. **Supabase Dashboard > Authentication > Providers**
2. **Activez Discord** :
   - ✅ **Enable Discord provider**
   - **Client ID** : Votre Discord Client ID
   - **Client Secret** : Votre Discord Client Secret

## 🔧 4. Configuration avancée

### Règles de sécurité (RLS)
1. **Supabase Dashboard > Authentication > Policies**
2. **Activez RLS** sur vos tables
3. **Créez des politiques** pour protéger les données

### Configuration des sessions
1. **Authentication > Settings > Session**
2. **JWT expiry** : 3600 (1 heure)
3. **Refresh token rotation** : ON
4. **Refresh token reuse detection** : ON

### Configuration des cookies
1. **Authentication > Settings > Cookies**
2. **SameSite** : Lax
3. **Secure** : ON (en production)
4. **HttpOnly** : ON

## 📱 5. Configuration mobile (optionnel)

### Deep linking
1. **Configurez les URL schemes** pour iOS/Android
2. **Ajoutez les URLs** dans les redirect URLs :
   ```
   com.athlink.app://auth/callback
   ```

## 🧪 6. Test de la configuration

### Test des emails
1. **Créez un compte** sur votre site
2. **Vérifiez** que l'email de confirmation arrive
3. **Cliquez sur le lien** pour confirmer

### Test des providers OAuth
1. **Testez Google** : Cliquez sur "Continuer avec Google"
2. **Testez GitHub** : Cliquez sur "Continuer avec GitHub"
3. **Vérifiez** que la redirection fonctionne

### Test des domaines
1. **Testez en local** : http://localhost:3001
2. **Testez en production** : https://votre-domaine.com
3. **Vérifiez** que les redirections fonctionnent

## 🚨 7. Sécurité

### Bonnes pratiques
1. **Utilisez HTTPS** en production
2. **Configurez CORS** correctement
3. **Limitez les redirect URLs** aux domaines autorisés
4. **Activez RLS** sur toutes les tables
5. **Surveillez** les logs d'authentification

### Variables d'environnement
```env
# Production
NEXT_PUBLIC_SUPABASE_URL=https://ioyklugzwavjyondimwd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key

# Google OAuth
GOOGLE_CLIENT_ID=votre_google_client_id
GOOGLE_CLIENT_SECRET=votre_google_client_secret

# GitHub OAuth (optionnel)
GITHUB_CLIENT_ID=votre_github_client_id
GITHUB_CLIENT_SECRET=votre_github_client_secret
```

## 📞 8. Support

Si vous rencontrez des problèmes :
1. **Vérifiez les logs** dans Supabase Dashboard
2. **Consultez la documentation** : https://supabase.com/docs/guides/auth
3. **Testez** avec des outils comme Postman
4. **Vérifiez** les configurations OAuth dans les consoles des providers
