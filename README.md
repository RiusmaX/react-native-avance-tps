# TP-07 : Migration React Navigation → Expo Router

**Branche :** `tp-07-navigation-legacy`
**Module :** M9 — Expo Router & Navigation Moderne
**Durée :** 0h25
**Niveau :** ⬡⬡⬡ Avancé

## Contexte

App utilisant **React Navigation v6** (Stack + Bottom Tabs + guard d'auth).
À migrer vers **Expo Router v3** (file-based routing).

## Architecture de départ

```
AppNavigator (NativeStack)
├── MainTabs (BottomTabNavigator)
│   ├── Home       → HomeScreen
│   └── Products   → ProductsScreen
├── ProductDetail  → ProductDetailScreen (params: { productId })
└── Login          → LoginScreen (modal)
```

## Architecture cible

```
app/
├── _layout.tsx           # Root Stack + guard auth
├── (tabs)/
│   ├── _layout.tsx       # Bottom Tab Layout
│   ├── index.tsx         # HomeScreen
│   └── products.tsx      # ProductsScreen
├── product/
│   └── [id].tsx          # Route dynamique
└── login.tsx             # Login en modal
```

## 5 étapes

| Étape | Durée | Action |
|-------|-------|--------|
| 1 | 3 min | Installer `expo-router`, créer `app/`, configurer `scheme` |
| 2 | 3 min | Créer `app/_layout.tsx` (Stack) |
| 3 | 10 min | Créer `app/(tabs)/_layout.tsx` + fichiers écrans |
| 4 | 5 min | Route dynamique `app/product/[id].tsx` |
| 5 | 4 min | Guard auth : `useSegments` + `Redirect` |

## Points clés

- `useLocalSearchParams` → `route.params`
- `router.push`, `router.replace` → `navigation.navigate`
- `useSegments` + `Redirect` → `AuthGuard` legacy
- Deep link fonctionnel : `npx uri-scheme open rnadv-tp07://product/123`
