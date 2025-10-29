# 🔧 Configuration Supabase - Guide Complet

## 📋 Étape 1 : Accéder au Dashboard Supabase

1. **Ouvrez votre navigateur** et allez sur : https://supabase.com/dashboard
2. **Connectez-vous** avec votre compte Supabase
3. **Sélectionnez votre projet** : `ioyklugzwavjyondimwd`

## 🗄️ Étape 2 : Créer la Table Profiles

### 2.1 Aller dans SQL Editor
1. Dans le menu de gauche, cliquez sur **"SQL Editor"**
2. Cliquez sur **"New query"**

### 2.2 Exécuter le Script SQL
Copiez et collez ce code SQL complet :

```sql
-- Créer la table profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    sport TEXT NOT NULL,
    plan TEXT DEFAULT 'FREE',
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activer RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre aux utilisateurs de voir leur propre profil
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Politique pour permettre aux utilisateurs de modifier leur propre profil
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Politique pour permettre aux utilisateurs de créer leur propre profil
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Politique pour permettre aux utilisateurs de supprimer leur propre profil
CREATE POLICY "Users can delete own profile" ON public.profiles
    FOR DELETE USING (auth.uid() = id);

-- Politique pour permettre la lecture des profils publics
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (is_public = true);
```

### 2.3 Exécuter la Requête
1. Cliquez sur **"Run"** (ou Ctrl+Enter)
2. Vérifiez que vous voyez le message : **"Success. No rows returned"**

## 🔐 Étape 3 : Configurer l'Authentification

### 3.1 Aller dans Authentication
1. Dans le menu de gauche, cliquez sur **"Authentication"**
2. Cliquez sur **"Settings"**

### 3.2 Configurer les URLs de Redirection
1. Dans la section **"Site URL"**, ajoutez :
   ```
   http://localhost:8000
   ```

2. Dans la section **"Redirect URLs"**, ajoutez :
   ```
   http://localhost:8000
   http://localhost:8000/index.html
   ```

3. Cliquez sur **"Save"**

### 3.3 Désactiver la Confirmation Email (pour le développement)
1. Dans **"Authentication"** > **"Settings"**
2. Trouvez **"Enable email confirmations"**
3. **Décochez** cette option
4. Cliquez sur **"Save"**

## 🧪 Étape 4 : Tester la Configuration

### 4.1 Tester l'Application
1. Ouvrez votre navigateur
2. Allez sur : http://localhost:8000
3. Testez l'inscription avec un nouvel utilisateur
4. Testez la connexion

### 4.2 Vérifier avec le Script de Test
Dans votre terminal, exécutez :
```bash
node test-supabase.js
```

Vous devriez voir :
```
✅ Connexion Supabase réussie
✅ Inscription réussie
✅ Connexion réussie
✅ Déconnexion réussie
🎉 Tous les tests sont passés avec succès !
```

## 🔍 Étape 5 : Vérifier les Données

### 5.1 Vérifier dans Supabase
1. Allez dans **"Table Editor"**
2. Sélectionnez la table **"profiles"**
3. Vous devriez voir les profils créés lors des tests

### 5.2 Vérifier l'Authentification
1. Allez dans **"Authentication"** > **"Users"**
2. Vous devriez voir les utilisateurs créés

## 🚨 Résolution des Problèmes

### Problème : "Could not find the table 'public.profiles'"
**Solution** : Vérifiez que vous avez bien exécuté le script SQL de l'étape 2

### Problème : "Email not confirmed"
**Solution** : Vérifiez que vous avez désactivé la confirmation email (étape 3.3)

### Problème : "Invalid API key"
**Solution** : Vérifiez que les clés dans `index.html` sont correctes

### Problème : "CORS error"
**Solution** : Vérifiez que les URLs de redirection sont bien configurées (étape 3.2)

## ✅ Vérification Finale

Une fois tout configuré, vous devriez pouvoir :
- ✅ Créer un compte utilisateur
- ✅ Se connecter avec ce compte
- ✅ Voir le dashboard utilisateur
- ✅ Se déconnecter
- ✅ Voir les données dans Supabase

## 🎯 Prochaines Étapes

Une fois la configuration terminée, vous pourrez :
1. **Personnaliser l'interface** dans `index.html`
2. **Ajouter de nouvelles fonctionnalités** (upload d'images, etc.)
3. **Déployer l'application** sur Vercel, Netlify, etc.

---

**Besoin d'aide ?** Vérifiez la console du navigateur (F12) pour voir les erreurs détaillées.
