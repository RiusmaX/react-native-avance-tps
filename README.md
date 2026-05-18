# TP-07 : Migration React Navigation → Expo Router

**Branche :** `tp-07-navigation-legacy`
**Module :** M9 — Expo Router & Navigation Moderne
**Durée :** 0h25
**Niveau :** ⬡⬡⬡ Avancé

## Contexte

App utilisant **React Navigation v6** (Stack + Bottom Tabs + guard d'auth).
À migrer vers **Expo Router v4** (file-based routing, version shipée avec Expo SDK 55).

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
| 1 | 3 min | Installer `expo-router@~4.0.0`, `expo-linking@~7.0.0`, `react-native-gesture-handler@~2.16.0` ; changer `package.json#main` en `"expo-router/entry"` ; ajouter `"plugins": ["expo-router"]` dans `app.json` |
| 2 | 3 min | Créer `app/_layout.tsx` (Stack) |
| 3 | 10 min | Créer `app/(tabs)/_layout.tsx` + fichiers écrans |
| 4 | 5 min | Route dynamique `app/product/[id].tsx` |
| 5 | 4 min | Guard auth : `useSegments` + `Redirect` |

## Mappings React Navigation → Expo Router

| React Navigation v6 (départ) | Expo Router v4 (arrivée) |
|------------------------------|---------------------------|
| `route.params.productId` | `useLocalSearchParams<{ id: string }>()` |
| `navigation.navigate('Login')` | `router.push('/login')` |
| `<AuthGuard>` (composant englobant) | `useSegments()` + `<Redirect />` dans `_layout.tsx` |

## Deep link de test

```bash
# Android (depuis Windows : nécessite un émulateur en cours)
npx uri-scheme open rnadv-tp07://product/123 --android

# iOS (macOS uniquement)
npx uri-scheme open rnadv-tp07://product/123 --ios
```
