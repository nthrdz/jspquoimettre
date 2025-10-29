# Athlink - Application Pure Supabase

## 🚀 Description

Application web moderne pour athlètes, entièrement basée sur Supabase. Plus de Next.js, plus de complexité - juste Supabase !

## ✨ Fonctionnalités

- ✅ **Authentification** : Inscription et connexion avec Supabase Auth
- ✅ **Interface moderne** : Design responsive et élégant
- ✅ **Gestion des profils** : Nom, email, sport, nom d'utilisateur
- ✅ **Sécurité** : Authentification sécurisée avec Supabase
- ✅ **Simplicité** : Une seule page HTML avec JavaScript

## 🛠️ Installation

### Option 1 : Hébergement local
```bash
# Démarrer un serveur local
python -m http.server 8000

# Ou avec Node.js
npx serve .

# Ou avec PHP
php -S localhost:8000
```

### Option 2 : Déploiement sur Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Allez dans "Storage" > "New Bucket"
4. Uploadez le fichier `index.html`
5. Configurez les permissions publiques

### Option 3 : Déploiement sur Vercel/Netlify
1. Uploadez simplement le fichier `index.html`
2. Configurez les variables d'environnement Supabase
3. Déployez !

## 🔧 Configuration

### Variables d'environnement Supabase
```javascript
const supabaseUrl = 'VOTRE_URL_SUPABASE'
const supabaseKey = 'VOTRE_CLE_ANON_SUPABASE'
```

### Configuration de l'authentification
1. Allez dans votre projet Supabase
2. Allez dans "Authentication" > "Settings"
3. Configurez les domaines autorisés
4. Activez l'inscription par email

## 📱 Utilisation

### Inscription
1. Ouvrez `index.html` dans votre navigateur
2. Cliquez sur "Créer un compte"
3. Remplissez le formulaire
4. Confirmez votre email (si configuré)

### Connexion
1. Entrez votre email et mot de passe
2. Cliquez sur "Se connecter"
3. Accédez à votre tableau de bord

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans le `<style>` :
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --error-color: #e74c3c;
  --success-color: #27ae60;
}
```

### Fonctionnalités
Ajoutez de nouvelles fonctionnalités en modifiant le JavaScript :
- Gestion des profils
- Upload d'images
- Notifications
- Chat en temps réel

## 🔒 Sécurité

- ✅ Authentification sécurisée avec Supabase
- ✅ Validation côté client et serveur
- ✅ Gestion des erreurs
- ✅ Protection CSRF intégrée

## 📊 Base de données

L'application utilise les tables Supabase suivantes :
- `auth.users` : Utilisateurs authentifiés
- `profiles` : Profils utilisateurs (à créer)

### Créer la table profiles
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  sport TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent voir et modifier leur propre profil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## 🚀 Déploiement

### Sur Supabase
1. Allez dans "Storage"
2. Créez un bucket public
3. Uploadez `index.html`
4. Configurez l'URL publique

### Sur Vercel
1. Créez un nouveau projet
2. Uploadez `index.html`
3. Configurez les variables d'environnement
4. Déployez !

### Sur Netlify
1. Glissez-déposez le dossier
2. Configurez les variables d'environnement
3. Déployez !

## 🎯 Avantages

- ✅ **Simplicité** : Une seule page HTML
- ✅ **Performance** : Chargement ultra-rapide
- ✅ **Maintenance** : Code simple et lisible
- ✅ **Coût** : Gratuit avec Supabase
- ✅ **Sécurité** : Authentification professionnelle
- ✅ **Évolutivité** : Facile à étendre

## 🔄 Migration depuis Next.js

Si vous migrez depuis Next.js :
1. Sauvegardez vos données
2. Configurez Supabase
3. Uploadez cette application
4. Migrez vos données utilisateur
5. Testez l'authentification

## 📞 Support

- Documentation Supabase : [supabase.com/docs](https://supabase.com/docs)
- Communauté : [github.com/supabase/supabase](https://github.com/supabase/supabase)
- Support : [supabase.com/support](https://supabase.com/support)

---

**Athlink** - Simplifiez votre développement avec Supabase ! 🚀
