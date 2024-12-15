# LaPince - Application de Gestion de Budget

Application web permettant de gérer son budget personnel avec des fonctionnalités avancées de suivi des dépenses et d'épargne.

## Fonctionnalités

✅ Gestion des transactions

- Ajout, modification et suppression de transactions
- Catégorisation des dépenses
- Filtrage et recherche avancée

✅ Suivi budgétaire

- Définition de budgets par catégorie
- Alertes de dépassement
- Visualisation des dépenses

✅ Objectifs d'épargne

- Définition d'objectifs mensuels
- Suivi de la progression
- Notifications d'atteinte d'objectifs

✅ Fonctionnalités avancées

- Export des données en CSV
- Support multilingue (FR/EN)
- Mode sombre/clair
- Interface responsive

## Technologies utilisées

### Frontend

- React + Vite
- TypeScript
- Tailwind CSS
- Radix UI
- i18next pour l'internationalisation

### Backend

- NestJS
- PostgreSQL
- Prisma ORM
- JWT pour l'authentification

## Installation

1. Cloner le repository

```bash
git clone https://github.com/akaSay/lapince.git
cd lapince
```

2. Installation des dépendances

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Configuration

- Copier `.env.example` vers `.env` dans le dossier backend
- Configurer les variables d'environnement

4. Démarrage avec Docker

```bash
docker-compose up
```

L'application sera disponible sur :

- Frontend : http://localhost:5173
- Backend : http://localhost:3001

## Auteur

[Solliez Quentin]

## Droits

© 2024 Solliez Quentin - Tous droits réservés
