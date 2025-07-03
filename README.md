# Test - Application Next.js

[Démo en ligne](https://iovann-soft-vodooz-front-test.vercel.app/)

Ce projet est une application web construite avec [Next.js](https://nextjs.org), utilisant TypeScript, et organisée autour de la gestion et l'affichage de livres (BookCard, BookGrid, Shelf, etc.). Il inclut des composants réutilisables, des tests unitaires, et une intégration avec une API externe (gloseApi).

## Fonctionnalités principales

- Affichage de livres sous forme de cartes et de grilles
- Barre de recherche pour filtrer les livres
- Système d'étagères (Shelf) pour organiser les livres
- Sidebar pour la navigation entre les étagères
- Système de notation (étoiles)
- Skeletons pour le chargement
- Intégration d'une API externe (gloseApi)
- Tests unitaires avec Vitest

## Structure du projet

```
app/
  components/           # Composants globaux de l'application
  shelf/[id]/           # Pages et composants liés à une étagère spécifique
src/
  components/ui/        # Composants UI réutilisables (button, card, input, etc.)
  context/              # Contexts React (ex: SearchContext)
  lib/                  # Fonctions utilitaires
  services/             # Services d'accès aux APIs externes
  types/                # Types TypeScript partagés
__test__/               # Tests unitaires des composants
test/                   # Configuration des tests
public/                 # Fichiers statiques (icônes, images)
```

## Installation

1. Clone le dépôt :
   ```bash
   git clone https://github.com/Iovann/front_test.git
   ```

2. Installe les dépendances :
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

## Lancement du serveur de développement

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

## Lancer les tests

```bash
npm run test
# ou
yarn test
# ou
pnpm test
```

## Technologies utilisées

- Next.js
- React
- TypeScript
- Vitest (tests)
- CSS Modules

## Déploiement

Le déploiement est possible sur [Vercel](https://vercel.com/) ou toute plateforme compatible Next.js.

## Licence

Ce projet est sous licence MIT.
