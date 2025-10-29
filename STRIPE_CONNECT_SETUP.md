# 🔗 Configuration Stripe Connect pour l'Affiliation

## 📋 **Vue d'ensemble**

Stripe Connect permet de payer automatiquement les commissions de vos affiliés directement sur leurs comptes Stripe.

## 🚀 **Étapes de configuration**

### **1. Activer Stripe Connect**

1. **Connectez-vous à votre dashboard Stripe** : [dashboard.stripe.com](https://dashboard.stripe.com)

2. **Allez dans "Connect"** dans le menu de gauche

3. **Cliquez sur "Get started"** ou "Activer Connect"

4. **Choisissez le type de compte** :
   - **Express** : Recommandé pour les affiliés (plus simple)
   - **Standard** : Pour les partenaires avec plus de contrôle

### **2. Récupérer les clés API**

1. **Dans Connect > Settings > API keys**

2. **Copiez le "Client ID"** (commence par `ca_...`)

3. **Ajoutez-le à vos variables d'environnement** :
   ```env
   STRIPE_CONNECT_CLIENT_ID=ca_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### **3. Configuration des webhooks Connect**

1. **Allez dans "Developers > Webhooks"**

2. **Cliquez sur "Add endpoint"**

3. **URL du webhook** : `https://votre-domaine.com/api/webhooks/stripe-connect`

4. **Événements à écouter** :
   - `account.updated`
   - `account.application.deauthorized`
   - `capability.updated`

### **4. Configuration des paiements**

1. **Dans Connect > Settings > Payouts**

2. **Activez "Instant payouts"** (optionnel)

3. **Configurez les délais de paiement** :
   - **Standard** : 2-7 jours ouvrables
   - **Instant** : Immédiat (frais supplémentaires)

## 🔧 **Intégration dans l'application**

### **1. Variables d'environnement Vercel**

Ajoutez dans Vercel :
```env
STRIPE_CONNECT_CLIENT_ID=ca_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### **2. API pour créer des comptes Connect**

```typescript
// app/api/affiliate/create-connect-account/route.ts
export async function POST(req: Request) {
  const stripe = getStripe()
  
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'FR',
    email: 'affiliate@example.com',
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true }
    }
  })
  
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: 'https://votre-app.com/affiliate/reauth',
    return_url: 'https://votre-app.com/affiliate/success',
    type: 'account_onboarding'
  })
  
  return NextResponse.json({ accountId: account.id, url: accountLink.url })
}
```

### **3. Paiement des commissions**

```typescript
// Dans lib/affiliate-commission.ts
export async function payAffiliateCommissions(affiliateId: string) {
  const affiliate = await prisma.affiliate.findUnique({
    where: { id: affiliateId }
  })
  
  if (!affiliate.stripeAccountId) {
    throw new Error("Compte Stripe Connect non configuré")
  }
  
  const transfer = await stripe.transfers.create({
    amount: Math.round(totalAmount * 100),
    currency: "eur",
    destination: affiliate.stripeAccountId,
    description: `Commissions Athlink`
  })
  
  return transfer
}
```

## 🎯 **Flux complet d'affiliation**

### **1. Inscription d'un affilié**
1. L'utilisateur s'inscrit comme affilié
2. Il configure son compte Stripe Connect
3. Il reçoit un lien d'onboarding Stripe
4. Une fois configuré, il peut créer des codes

### **2. Utilisation d'un code**
1. Un client utilise un code de parrainage
2. Le système track la référence
3. Lors de l'achat, une commission est générée
4. La commission est marquée comme "PENDING"

### **3. Paiement des commissions**
1. L'admin voit les commissions en attente
2. Il clique sur "Payer" pour un affilié
3. Le système transfère l'argent via Stripe Connect
4. La commission est marquée comme "PAID"

## 💰 **Frais et coûts**

### **Frais Stripe Connect**
- **Express** : 0.5% + 0.25€ par transfert
- **Standard** : 0.5% + 0.25€ par transfert
- **Instant payouts** : +1% supplémentaire

### **Exemple de calcul**
- Commission de 10€
- Frais Stripe : 0.5% + 0.25€ = 0.30€
- Montant reçu par l'affilié : 9.70€

## 🛡️ **Sécurité et conformité**

### **1. Validation des comptes**
- Vérifier que le compte est activé
- Contrôler les capacités de paiement
- Valider l'identité de l'affilié

### **2. Limites et contrôles**
- Limite de montant par transfert
- Vérification des comptes suspects
- Logs de toutes les transactions

## 📊 **Monitoring et analytics**

### **1. Dashboard Stripe Connect**
- Suivi des comptes créés
- Statistiques de paiements
- Gestion des disputes

### **2. Logs applicatifs**
- Toutes les commissions
- Statut des paiements
- Erreurs de transfert

## 🚨 **Gestion des erreurs**

### **1. Compte non configuré**
```typescript
if (!affiliate.stripeAccountId) {
  return NextResponse.json({ 
    error: "Compte Stripe non configuré" 
  }, { status: 400 })
}
```

### **2. Échec de transfert**
```typescript
try {
  const transfer = await stripe.transfers.create(...)
} catch (error) {
  console.error("Erreur transfert:", error)
  // Marquer la commission comme échouée
}
```

## 🎯 **Prochaines étapes**

1. **Configurer Stripe Connect** dans votre dashboard
2. **Ajouter la variable d'environnement** dans Vercel
3. **Tester avec un compte de test** Stripe
4. **Déployer en production** avec les vrais comptes

---

**🔗 Votre système d'affiliation est maintenant prêt avec Stripe Connect !**
