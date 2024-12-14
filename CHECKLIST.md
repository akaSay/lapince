# Checklist de Tests - Application Budget

## 🔐 Authentification

### Inscription

- [x] Validation email (format correct)
- [x] Validation mot de passe (min 6 caractères)
- [x] Message d'erreur si email déjà utilisé
- [x] Redirection vers dashboard après inscription

### Connexion

- [x] Message d'erreur si identifiants incorrects
- [x] Persistance de la session (token JWT)
- [x] Redirection vers page demandée après login

### Déconnexion

- [x] Suppression du token
- [x] Redirection vers login
- [x] Impossibilité d'accéder aux routes protégées

## 💰 Transactions

### Création

- [x] Validation des champs requis
- [x] Format du montant correct
- [x] Sélection de la catégorie
- [x] Date par défaut = aujourd'hui
- [x] Message de succès

### Modification

- [x] Chargement des données existantes
- [x] Validation des modifications
- [x] Message de succès

### Suppression

- [x] Confirmation avant suppression
- [x] Message de succès
- [x] Mise à jour immédiate de la liste

### Liste/Filtres

- [x] Pagination fonctionne
- [x] Filtres par date
- [x] Filtres par catégorie
- [x] Recherche

## 📊 Budgets

### Création

- [x] Validation montant limite
- [x] Sélection catégorie
- [x] Message de succès

### Suivi

- [x] Affichage progression
- [x] Calcul correct du pourcentage
- [x] Code couleur selon niveau (vert/orange/rouge)

### Alertes

- [x] Notification à 80%
- [x] Notification à 100%
- [x] Possibilité de les marquer comme lues

## 🔔 Notifications

### Système

- [x] Réception des nouvelles notifications
- [x] Badge de compteur
- [x] Liste déroulante dans le header

### Gestion

- [x] Marquer comme lu/non lu
- [x] Suppression

### Types de notifications

- [x] Budget (dépassement)
- [x] Système (mises à jour)

## 🎨 Interface

### Responsive

#### Mobile (< 640px)

- [x] Menu burger fonctionne
- [x] Tableaux adaptés
- [x] Formulaires lisibles

#### Tablette (768px - 1024px)

- [x] Layout adapté
- [x] Graphiques redimensionnés

#### Desktop (> 1024px)

- [x] Utilisation optimale de l'espace
- [x] Dashboard bien organisé

## 🌍 Internationalisation

### Français

- [x] Tous les textes traduits
- [x] Formats de date corrects
- [x] Formats de nombre corrects

### Anglais

- [x] Tous les textes traduits
- [x] Formats de date corrects
- [x] Formats de nombre corrects

### Changement de langue

- [x] Mise à jour immédiate
- [x] Persistance du choix

## 🐛 Gestion des erreurs

### Réseau

- [x] Message si serveur non disponible
- [x] Retry automatique
- [x] Conservation des données non envoyées

### Validation

- [x] Messages d'erreur clairs
- [x] Indication des champs en erreur
- [x] Possibilité de corriger

## 🔄 Performance

### Chargement

- [x] Temps de chargement initial < 3s
- [x] Skeleton loader pendant chargement
- [x] Pas de flash de contenu

### Actions

- [x] Réactivité des boutons
- [x] Feedback immédiat
- [x] Animations fluides

---

## Notes de test

- Date de début des tests : 12/11/2024
- Testeur : Quentin
- Environnement : localhost
- Version de l'application : 1.0.0

## Bugs trouvés

1.Fonction recherche non fonctionnelle (terminer)

## Améliorations suggérées

1.Ameliorer les messages d'erreur (terminer)
2.Adapter le responsive en format mobile 375 x 812 px (iPhone X, 11, 12, 13, etc.) (terminer)
3.Ajouter un loader pendant le chargement (terminer)
4.Search Catégorie en francais et en anglais (terminer)
5.Exporter les données en en CSV (terminer)
6.Suppression du compte (terminer)
7.Page de Présentation de l'application (terminer)
8.Formulaire Formik et yup a l'inscription et connexion (terminer)
9.Cookie consent (terminer)
10.Cookie token back (terminer)
11.Ajouter objectif d'épargne (terminer)
