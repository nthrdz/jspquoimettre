# 🔑 Variables d'Environnement pour Athlink SaaS

## 📋 Liste complète des variables à configurer dans Vercel

### 🔐 AUTHENTIFICATION (NextAuth v5) - OBLIGATOIRE

```bash
AUTH_SECRET=your-nextauth-secret-32-characters-here
AUTH_URL=https://your-domain.vercel.app
```

**Comment obtenir AUTH_SECRET :**
```bash
# Option 1: Terminal
openssl rand -base64 32

# Option 2: En ligne
https://generate-secret.vercel.app/32
```

---

### 🗄️ BASE DE DONNÉES (PostgreSQL) - OBLIGATOIRE

```bash
DATABASE_URL=postgresql://username:password@host:port/database
```

**Options de base de données :**
- **Supabase** (recommandé) : `https://supabase.com`
- **Vercel Postgres** : Via l'onglet Storage de Vercel
- **Neon** : `https://neon.tech`
- **PlanetScale** : `https://planetscale.com`

---

### 💳 STRIPE (Paiements) - OBLIGATOIRE

```bash
# Clé secrète (commence par sk_live_ ou sk_test_)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here

# Clé publique (commence par pk_live_ ou pk_test_)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here

# Secret du webhook (commence par whsec_)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Configuration des webhooks Stripe :**
1. Allez dans Stripe Dashboard → Webhooks
2. Ajoutez un endpoint : `https://your-domain.vercel.app/api/webhooks`
3. Sélectionnez ces événements :
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copiez le secret du webhook

---

### 📁 SUPABASE (Stockage de fichiers) - OBLIGATOIRE

```bash
# URL de votre projet Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Clé anonyme Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_supabase_anon_key_here
```

**Configuration Supabase :**
1. Créez un projet sur `https://supabase.com`
2. Allez dans Settings → API
3. Copiez l'URL et la clé anonyme
4. Créez un bucket `athlink-uploads` dans Storage

---

### 🌐 CONFIGURATION APPLICATION - OBLIGATOIRE

```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

---

### 🔐 GOOGLE OAUTH (Optionnel)

```bash
# Si vous voulez activer la connexion Google
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_OAUTH_ENABLED=true
```

---

## 🚀 Instructions de Configuration

### Pour Vercel (Production) :

1. **Allez dans Vercel** → Votre projet → Settings → Environment Variables
2. **Ajoutez chaque variable** une par une avec les vraies valeurs
3. **Assurez-vous** que `NODE_ENV=production`
4. **Redéployez** votre projet après avoir ajouté toutes les variables

### Pour le développement local :

1. **Créez un fichier** `.env.local` à la racine du projet
2. **Copiez les variables** ci-dessus avec vos vraies valeurs
3. **Ne commitez jamais** `.env.local` (il est dans `.gitignore`)

---

## ✅ Checklist de Configuration

- [ ] `AUTH_SECRET` configuré (32 caractères)
- [ ] `AUTH_URL` configuré (URL de votre domaine Vercel)
- [ ] `DATABASE_URL` configuré (base de données de production)
- [ ] `STRIPE_SECRET_KEY` configuré (clé secrète Stripe)
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` configuré (clé publique Stripe)
- [ ] `STRIPE_WEBHOOK_SECRET` configuré (secret du webhook)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configuré (URL Supabase)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configuré (clé anonyme Supabase)
- [ ] `NODE_ENV=production` configuré
- [ ] `NEXT_PUBLIC_APP_URL` configuré (URL de votre domaine)
- [ ] Webhooks Stripe configurés
- [ ] Bucket Supabase créé
- [ ] Projet redéployé sur Vercel

---

## 🆘 Dépannage

### Erreur "AUTH_SECRET is not configured"
- Vérifiez que `AUTH_SECRET` est bien configuré dans Vercel
- Assurez-vous qu'il fait 32 caractères minimum

### Erreur "STRIPE_SECRET_KEY is not configured"
- Vérifiez que `STRIPE_SECRET_KEY` est bien configuré dans Vercel
- Assurez-vous d'utiliser la bonne clé (test ou live)

### Erreur "supabaseUrl is required"
- Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` est bien configuré
- Assurez-vous que l'URL commence par `https://`

### Erreur de base de données
- Vérifiez que `DATABASE_URL` est correcte
- Assurez-vous que la base de données est accessible
- Vérifiez que Prisma peut se connecter

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez les logs Vercel (Functions → Logs)
2. Testez localement avec les mêmes variables
3. Vérifiez que toutes les variables sont configurées
4. Assurez-vous que les services externes (Stripe, Supabase) sont bien configurés
