# 🎯 Système d'Affiliation Athlink

## 📋 **Vue d'ensemble**

Le système d'affiliation permet à vos ambassadeurs de gagner des commissions en parrainant de nouveaux utilisateurs vers votre plateforme Athlink.

## 🏗️ **Architecture**

### **1. Modèles de données**
- **Affiliate** : Informations des ambassadeurs
- **ReferralCode** : Codes de parrainage créés par les affiliés
- **Referral** : Utilisations des codes de parrainage
- **Commission** : Commissions générées et payées

### **2. Flux de fonctionnement**
1. **Création d'un affilié** : Un utilisateur devient affilié
2. **Génération de codes** : L'affilié crée des codes de parrainage
3. **Utilisation des codes** : Un utilisateur utilise un code lors de l'inscription/achat
4. **Conversion** : L'utilisateur achète un abonnement
5. **Commission** : Une commission est automatiquement générée
6. **Paiement** : L'admin paie les commissions via Stripe Connect

## 🔧 **Configuration requise**

### **1. Variables d'environnement**
```env
# Stripe (déjà configuré)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Stripe Connect (pour les paiements aux affiliés)
STRIPE_CONNECT_CLIENT_ID=ca_...
```

### **2. Base de données**
```bash
# Générer le client Prisma avec les nouveaux modèles
npx prisma generate

# Appliquer les migrations
npx prisma db push
```

## 🚀 **Fonctionnalités**

### **Pour les Affiliés :**
- ✅ Dashboard personnel avec statistiques
- ✅ Création de codes de parrainage personnalisés
- ✅ Suivi des conversions en temps réel
- ✅ Historique des commissions
- ✅ Configuration des taux de commission

### **Pour l'Administration :**
- ✅ Gestion des affiliés (validation, suspension)
- ✅ Paiement des commissions via Stripe Connect
- ✅ Statistiques globales
- ✅ Suivi des performances par affilié

### **Pour les Utilisateurs :**
- ✅ Application de codes de parrainage
- ✅ Réductions automatiques
- ✅ Essais gratuits étendus

## 📊 **Types de commissions**

### **1. Pourcentage (par défaut : 10%)**
- Commission basée sur le montant de l'abonnement
- Exemple : 10% sur un abonnement de 29€ = 2.90€ de commission

### **2. Montant fixe**
- Commission fixe par conversion
- Exemple : 5€ par abonnement, peu importe le plan

## 💳 **Paiements via Stripe Connect**

### **Configuration Stripe Connect :**
1. Activer Stripe Connect dans votre dashboard Stripe
2. Récupérer le `STRIPE_CONNECT_CLIENT_ID`
3. Configurer les webhooks Connect

### **Processus de paiement :**
1. L'affilié configure son compte Stripe Connect
2. L'admin valide les commissions en attente
3. Paiement automatique via `stripe.transfers.create()`

## 🎯 **API Endpoints**

### **Affiliés :**
- `POST /api/affiliate/codes` - Créer un code de parrainage
- `GET /api/affiliate/codes` - Lister les codes
- `POST /api/affiliate/validate-code` - Valider un code

### **Administration :**
- `GET /api/admin/pay-commissions` - Statistiques des commissions
- `POST /api/admin/pay-commissions` - Payer les commissions

## 📱 **Interfaces utilisateur**

### **Dashboard Affilié :** `/dashboard/affiliate`
- Statistiques personnelles
- Gestion des codes
- Historique des commissions

### **Administration :** `/admin/commissions`
- Gestion des paiements
- Statistiques globales
- Validation des affiliés

## 🔄 **Intégration avec Stripe**

### **Webhook `checkout.session.completed` :**
```typescript
// Traitement automatique des commissions
await processAffiliateCommission(
  subscriptionId,
  amount,
  currency
)
```

### **Paiement des commissions :**
```typescript
// Paiement via Stripe Connect
await payAffiliateCommissions(affiliateId)
```

## 📈 **Métriques et Analytics**

### **Pour chaque affilié :**
- Nombre total de références
- Taux de conversion
- Montant total des commissions
- Commissions payées vs en attente

### **Globale :**
- Performance des codes de parrainage
- Top affiliés
- Revenus générés par l'affiliation

## 🛡️ **Sécurité**

### **Validation des codes :**
- Vérification de la validité des dates
- Limite d'utilisation
- Statut actif/inactif

### **Paiements :**
- Validation des comptes Stripe Connect
- Vérification des montants
- Logs des transactions

## 🚀 **Déploiement**

### **1. Mise à jour de la base de données :**
```bash
npx prisma db push
```

### **2. Configuration Stripe Connect :**
- Ajouter `STRIPE_CONNECT_CLIENT_ID` dans Vercel
- Configurer les webhooks Connect

### **3. Test du système :**
- Créer un affilié de test
- Générer un code de parrainage
- Tester l'utilisation du code
- Vérifier la génération des commissions

## 📞 **Support**

Pour toute question sur le système d'affiliation :
- Consulter les logs dans Vercel
- Vérifier les webhooks Stripe
- Contacter l'équipe technique

---

**🎯 Le système d'affiliation est maintenant prêt à être déployé !**
