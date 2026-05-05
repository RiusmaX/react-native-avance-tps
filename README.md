# TP-03 : Data Layer (TanStack Query + GraphQL) — CORRIGÉ

**Branche :** `solution/tp-03`
**Module :** M5 — Data Layer Moderne
**Durée :** 0h30
**Niveau :** ⬡⬡ Intermédiaire

## Ce que contient le corrigé

### Hooks TanStack Query implémentés

- `usePosts({ tag, limit })` — `useInfiniteQuery` avec pagination par offset, transformer GQL→domaine, `staleTime` 5 min
- `usePost(id)` — `useQuery` avec `enabled: !!id`, gestion du post introuvable
- `useCreatePost()` — `useMutation` + **optimistic update + rollback** (bonus)

### GraphQL

- Fragment `PostFields` réutilisé par `GET_POSTS`, `GET_POST`, `CREATE_POST`, `UPDATE_POST`
- Queries users (`GET_USERS`, `GET_USER`, `GET_USER_POSTS`) prêtes à l'emploi

### Domain layer

- `transformGQLPostToPost` / `transformGQLPostsToPosts` : isolent le schéma GQL du domaine, résilients aux données partielles

### UI

- `PostsScreen` : FlatList paginée + pull-to-refresh + footer loader + gestion d'erreur
- Callbacks stabilisés avec `useCallback` pour éviter les re-renders du `PostCard`

## Lancer le TP

```bash
# 1. Backend GraphQL
cd 03-backend-graphql
npm install
npm run seed
npm start          # http://localhost:4000/graphql

# 2. App
cd ..
npm install
npx expo start
```

## Diff vs starter

```bash
git diff tp-03-tanstack-starter solution/tp-03 -- src/
```

## Points pédagogiques clés à retenir

1. **`useInfiniteQuery` ≠ `useQuery`** : retourne `{ pages, pageParams }`, pas un tableau plat
2. **`select`** : transforme la donnée AVANT qu'elle atteigne le composant — idéal pour les transformers
3. **`getNextPageParam`** : retourner `undefined` arrête le scroll infini (≠ `null`)
4. **Optimistic update** : 4 callbacks (`onMutate`, `onError`, `onSettled`, `onSuccess`) + snapshot pour rollback
5. **`invalidateQueries`** : ne refetch QUE les queries actuellement montées (les autres sont marquées stale)

## Bonus — Aller plus loin

- Persister le cache avec `@tanstack/react-query-persist-client` + `AsyncStorage`
- DevTools : `@tanstack/react-query-devtools` (web seulement)
- Suspense mode : `useSuspenseQuery` (React 18+)
