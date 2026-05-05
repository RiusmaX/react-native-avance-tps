# TP-07 : Migration React Navigation → Expo Router — CORRIGÉ

**Branche :** `solution/tp-07`
**Module :** M9 — Expo Router & Navigation Moderne
**Durée :** 0h25
**Niveau :** ⬡⬡⬡ Avancé

## Ce que contient le corrigé

### Architecture Expo Router

```
app/
├── _layout.tsx           # Stack racine + AuthProvider + guard via useSegments
├── (tabs)/
│   ├── _layout.tsx       # Bottom Tab Layout (Home + Products)
│   ├── index.tsx         # ex-HomeScreen
│   └── products.tsx      # ex-ProductsScreen (FlatList de produits)
├── product/
│   └── [id].tsx          # Route dynamique → useLocalSearchParams
└── login.tsx             # Modal de login (presentation: 'modal')
```

### Code conservé du starter (toujours dans src/)

- `src/context/AuthContext.tsx` — Provider d'authentification (inchangé)
- `src/hooks/useAuth.ts` — Hook consumer

### Code retiré

- `src/navigation/` — remplacé entièrement par les fichiers `app/`
- `src/components/AuthGuard.tsx` — la logique passe dans `app/_layout.tsx`
- `src/screens/` — chaque écran déplacé dans `app/`

## Mappings clés

| React Navigation v6 | Expo Router v4 |
|---------------------|-----------------|
| `NavigationContainer` | `<Slot />` ou `<Stack />` racine dans `app/_layout.tsx` |
| `Stack.Navigator` + `Stack.Screen` | Convention de fichiers dans `app/` |
| `BottomTabNavigator` | Dossier `app/(tabs)/` + `_layout.tsx` |
| `route.params.productId` | `useLocalSearchParams<{ id: string }>()` |
| `navigation.navigate('Login')` | `router.push('/login')` |
| `presentation: 'modal'` | `<Stack.Screen options={{ presentation: 'modal' }} />` |
| `AuthGuard` (composant englobant) | `useSegments` + `<Redirect />` dans `_layout` |

## Lancer le TP

```bash
npm install
npx expo start
```

Tester le deep link :

```bash
npx uri-scheme open rnadv-tp07://product/42 --android
# ou --ios
```

## Diff vs starter

```bash
git diff tp-07-navigation-legacy solution/tp-07
```

## Points pédagogiques clés

1. **Convention > config** : Expo Router déduit les routes des fichiers, plus de tableau `screens`
2. **Layouts imbriqués** : un `_layout.tsx` par dossier, hérité par les enfants
3. **`useSegments`** : permet d'écrire un guard d'auth contextuel (dans/hors `(tabs)`)
4. **Routes dynamiques** : `[id].tsx` + `useLocalSearchParams` (typé avec generics)
5. **Coexistence possible** : on peut migrer écran par écran en gardant `react-navigation` pendant la transition

## Erreurs courantes pendant la migration

- ❌ Oublier `expo-linking` dans les deps → deep link cassé
- ❌ Mettre `App.tsx` au lieu de utiliser `expo-router/entry` dans `package.json#main`
- ❌ Faire le guard d'auth au niveau du Tab Layout au lieu du root → flash d'écran
- ❌ Utiliser `router.push` dans un `useEffect` synchrone → warning React
