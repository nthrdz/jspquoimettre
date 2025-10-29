# 🚀 Guide de Configuration - Application Pure Supabase

## ✅ Avantages de cette approche

- **Simplicité** : Une seule page HTML, pas de Next.js
- **Performance** : Chargement ultra-rapide
- **Coût** : Gratuit avec Supabase
- **Maintenance** : Code simple et lisible
- **Sécurité** : Authentification professionnelle

## 🔧 Configuration Supabase

### 1. Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Cliquez sur "Start your project"
3. Connectez-vous avec GitHub
4. Créez un nouveau projet :
   - **Name** : `athlink-saas`
   - **Database Password** : Choisissez un mot de passe fort
   - **Region** : Europe West (Paris)

### 2. Récupérer les clés API

1. Allez dans votre projet Supabase
2. Cliquez sur "Settings" > "API"
3. Copiez :
   - **Project URL** : `https://votre-projet.supabase.co`
   - **Anon Key** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Configurer l'authentification

1. Allez dans "Authentication" > "Settings"
2. Configurez les domaines autorisés :
   - `localhost:8000` (pour le développement)
   - `votre-domaine.com` (pour la production)
3. Activez "Enable email confirmations" si souhaité

### 4. Mettre à jour l'application

Modifiez le fichier `index.html` :

```javascript
// Ligne 248-249
const supabaseUrl = 'https://votre-projet.supabase.co'
const supabaseKey = 'votre-cle-anon-supabase'
```

## 🗄️ Configuration de la base de données

### Créer la table profiles

Allez dans "SQL Editor" et exécutez :

```sql
-- Créer la table profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  sport TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent modifier leur propre profil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Politique : Les utilisateurs peuvent insérer leur propre profil
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

## 🚀 Déploiement

### Option 1 : Hébergement local

```bash
# Démarrer un serveur local
python3 -m http.server 8000

# Ou avec Node.js
npx serve .

# Ou avec PHP
php -S localhost:8000
```

### Option 2 : Déploiement sur Supabase

1. Allez dans "Storage" > "New Bucket"
2. Nom : `athlink-app`
3. Public : ✅ Oui
4. Uploadez `index.html`
5. Copiez l'URL publique

### Option 3 : Déploiement sur Vercel

1. Créez un compte sur [vercel.com](https://vercel.com)
2. Créez un nouveau projet
3. Uploadez le fichier `index.html`
4. Configurez les variables d'environnement :
   - `SUPABASE_URL` : Votre URL Supabase
   - `SUPABASE_ANON_KEY` : Votre clé anon

### Option 4 : Déploiement sur Netlify

1. Créez un compte sur [netlify.com](https://netlify.com)
2. Glissez-déposez le dossier
3. Configurez les variables d'environnement
4. Déployez !

## 🧪 Test de l'application

### Test local

1. Ouvrez `http://localhost:8000`
2. Cliquez sur "Créer un compte"
3. Remplissez le formulaire
4. Testez la connexion

### Test de l'API

```bash
# Tester l'inscription
curl -X POST 'https://votre-projet.supabase.co/auth/v1/signup' \
  -H 'apikey: votre-cle-anon' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

## 🔒 Sécurité

### Configuration RLS

L'application utilise Row Level Security (RLS) pour :
- ✅ Empêcher l'accès aux données d'autres utilisateurs
- ✅ Permettre la modification de son propre profil
- ✅ Sécuriser l'authentification

### Variables d'environnement

Pour la production, utilisez des variables d'environnement :

```javascript
const supabaseUrl = process.env.SUPABASE_URL || 'https://votre-projet.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'votre-cle-anon'
```

## 📱 Fonctionnalités

### Authentification
- ✅ Inscription avec email/mot de passe
- ✅ Connexion sécurisée
- ✅ Déconnexion
- ✅ Gestion des sessions

### Profil utilisateur
- ✅ Nom complet
- ✅ Nom d'utilisateur unique
- ✅ Sport principal
- ✅ Email

### Interface
- ✅ Design responsive
- ✅ Animations fluides
- ✅ Gestion des erreurs
- ✅ Messages de succès

## 🔄 Migration depuis Next.js

### 1. Sauvegarder les données

```sql
-- Exporter les utilisateurs
SELECT * FROM auth.users;

-- Exporter les profils
SELECT * FROM profiles;
```

### 2. Configurer Supabase

1. Créer un nouveau projet Supabase
2. Importer les données
3. Configurer l'authentification

### 3. Déployer l'application

1. Uploadez `index.html`
2. Configurez les domaines autorisés
3. Testez l'authentification

## 🎯 Prochaines étapes

### Fonctionnalités à ajouter

1. **Upload d'images** : Avatar et photos de profil
2. **Gestion des amis** : Système de suivi
3. **Chat en temps réel** : Communication entre utilisateurs
4. **Notifications** : Alertes push
5. **API REST** : Endpoints pour mobile

### Optimisations

1. **PWA** : Application web progressive
2. **Offline** : Fonctionnement hors ligne
3. **Cache** : Mise en cache des données
4. **CDN** : Distribution globale

## 📞 Support

- **Documentation Supabase** : [supabase.com/docs](https://supabase.com/docs)
- **Communauté** : [github.com/supabase/supabase](https://github.com/supabase/supabase)
- **Discord** : [discord.supabase.com](https://discord.supabase.com)

---

**Félicitations !** Vous avez maintenant une application moderne, simple et performante avec Supabase ! 🎉
