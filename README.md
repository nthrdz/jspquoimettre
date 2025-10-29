# 🏃‍♂️ Athlink - Plateforme Sportive

Application web moderne pour les athlètes, construite avec **Supabase** uniquement.

## ✨ Fonctionnalités

- 🔐 **Authentification complète** avec Supabase Auth
- 👤 **Gestion des profils** avec base de données Supabase
- 🎨 **Interface moderne** et responsive
- 🏃‍♂️ **Sélection de sport** (Course, Vélo, Natation, Triathlon, Fitness, Autre)
- 📱 **Design mobile-first**
- ⚡ **Performance optimisée** (pas de build, chargement instantané)

## 🚀 Déploiement Rapide

### 1. Configuration Supabase (OBLIGATOIRE)

**Créez la table `profiles` dans Supabase :**

1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Allez dans **"SQL Editor"**
4. Exécutez ce script :

```sql
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

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON public.profiles
    FOR DELETE USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (is_public = true);
```

**Configurez l'authentification :**

1. Allez dans **"Authentication"** > **"Settings"**
2. Ajoutez votre URL de production dans **"Site URL"** et **"Redirect URLs"**
3. Désactivez **"Enable email confirmations"** (pour commencer)

### 2. Déploiement Vercel

**Option A : Interface Web**
1. Créez un repository GitHub
2. Poussez ce code : `git push origin main`
3. Allez sur https://vercel.com
4. Importez votre repository
5. Déployez !

**Option B : CLI**
```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel --prod
```

### 3. Test Local

```bash
# Démarrer le serveur
python3 -m http.server 8000

# Ouvrir http://localhost:8000
```

## 📁 Structure du Projet

```
athlink/
├── index.html              # Application principale
├── vercel.json            # Configuration Vercel
├── package.json           # Métadonnées du projet
├── deploy.sh              # Script de déploiement
├── DEPLOYMENT_GUIDE.md    # Guide détaillé
└── README.md              # Ce fichier
```

## 🔧 Configuration

L'application est pré-configurée avec vos clés Supabase :
- **URL** : `https://ioyklugzwavjyondimwd.supabase.co`
- **Clé Anon** : Intégrée dans le code

## 🎨 Personnalisation

### Modifier les Couleurs
Éditez les variables CSS dans `index.html` :
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

### Ajouter des Sports
Modifiez la section `.sport-options` :
```html
<div class="sport-option" data-sport="NOUVEAU_SPORT">Nouveau Sport</div>
```

## 🔒 Sécurité

- ✅ **HTTPS** automatique avec Vercel
- ✅ **Headers de sécurité** configurés
- ✅ **RLS (Row Level Security)** activé sur Supabase
- ✅ **Validation côté client** et serveur

## 📊 Performance

- ⚡ **Chargement instantané** (pas de build)
- 📱 **Responsive design** optimisé
- 🎯 **SEO optimisé** avec meta tags
- 🚀 **CDN global** avec Vercel

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Backend** : Supabase (Auth + Database)
- **Déploiement** : Vercel
- **CDN** : Vercel Edge Network

## 📞 Support

1. **Vérifiez la console** du navigateur (F12) pour les erreurs
2. **Consultez les logs** Supabase Dashboard
3. **Vérifiez la configuration** de la table `profiles`

## 🎯 Prochaines Étapes

- [ ] Upload d'images de profil
- [ ] Système de messagerie
- [ ] Analytics et métriques
- [ ] API REST pour mobile
- [ ] Système de notifications

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

---

**Développé avec ❤️ pour la communauté sportive**