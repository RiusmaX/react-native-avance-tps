# TP-03 : Data Layer (TanStack Query + GraphQL)

**Branche :** `tp-03-tanstack-starter`
**Module :** M5 — Data Layer Moderne
**Durée :** 0h30
**Niveau :** ⬡⬡ Intermédiaire

## Objectif

Connecter une app React Native au backend GraphQL fourni en utilisant **TanStack Query v5** et **graphql-request**, avec pagination infinie, mutation et invalidation de cache.

## Architecture cible

```
src/
├── data/
│   ├── graphql/
│   │   ├── client.ts            # GraphQLClient
│   │   └── queries/
│   │       ├── posts.ts         # GET_POSTS, GET_POST, CREATE_POST...
│   │       └── users.ts         # GET_USERS, GET_USER...
│   └── hooks/
│       ├── usePosts.ts          # useInfiniteQuery
│       ├── usePost.ts           # useQuery
│       └── useCreatePost.ts     # useMutation
├── domain/
│   ├── models/
│   │   ├── Post.ts              # ✅ Déjà fourni
│   │   └── User.ts              # ✅ Déjà fourni
│   └── transformers/
│       └── postTransformer.ts   # 🔲 À implémenter
└── ui/
    ├── components/
    │   └── PostCard.tsx         # ✅ Déjà fourni
    └── screens/
        └── PostsScreen.tsx      # 🔲 À compléter (FlatList + pagination)
```

## Prérequis : démarrer le backend

```bash
cd 03-backend-graphql
npm install
npm run seed       # 500 users + 5000 posts dans SQLite
npm start          # http://localhost:4000/graphql
```

## Lancer l'app

```bash
npm install
npx expo start
```

> ⚠️ **URL du backend selon la plateforme** — le starter a `http://localhost:4000/graphql`
> dans `src/data/graphql/client.ts`. Selon où tourne l'app :
>
> | Plateforme | URL à utiliser |
> |------------|----------------|
> | iOS Simulator | `http://localhost:4000/graphql` |
> | Android Emulator | `http://10.0.2.2:4000/graphql` |
> | Device physique (Wi-Fi) | `http://<IP-locale-du-PC>:4000/graphql` |
>
> Le plus simple : utiliser `Platform.OS === 'android' ? '10.0.2.2' : 'localhost'`
> directement dans `client.ts`.

## Étapes

| # | Tâche | Fichier | Durée |
|---|-------|---------|-------|
| 1 | Configurer `staleTime` et `gcTime` du QueryClient | `App.tsx` | 2 min |
| 2 | Écrire les requêtes GraphQL (GET_POSTS avec fragment, GET_POST, CREATE_POST) | `src/data/graphql/queries/posts.ts` | 5 min |
| 3 | Implémenter `transformGQLPostToPost(s)` | `src/domain/transformers/postTransformer.ts` | 3 min |
| 4 | Implémenter `usePosts` avec `useInfiniteQuery` (pagination par offset) | `src/data/hooks/usePosts.ts` | 8 min |
| 5 | Brancher `PostsScreen` sur `usePosts` (FlatList + onEndReached + pull-to-refresh) | `src/ui/screens/PostsScreen.tsx` | 7 min |
| 6 | Implémenter `useCreatePost` avec invalidation du cache | `src/data/hooks/useCreatePost.ts` | 5 min |
| 🏆 | **Bonus** : Optimistic update sur la création de post | `useCreatePost.ts` | +5 min |

## Livrable attendu

- ✅ Liste paginée qui se charge depuis le backend GraphQL
- ✅ Scroll infini fonctionnel (chargement par page de 20)
- ✅ Pull-to-refresh
- ✅ Création d'un post → la liste se rafraîchit automatiquement
- 🏆 (Bonus) Le post optimiste apparaît avant la confirmation serveur, rollback si erreur

## Points clés

- **`useInfiniteQuery` ≠ `useQuery`** : la donnée est une `{ pages, pageParams }`, pas un tableau plat → utiliser `select` pour aplatir
- **`getNextPageParam`** : retourner `undefined` arrête le scroll infini
- **`invalidateQueries`** ne refetch QUE les queries actuellement montées
- **Fragment GraphQL** : limite la duplication des champs entre queries

## Voir le corrigé

```bash
git diff tp-03-tanstack-starter solution/tp-03
```
