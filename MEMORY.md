# MEMORY — TP-07 : Migration React Navigation v6 → Expo Router v3

## Branche
- **Nom :** `solution/tp-07`
- **Basée sur :** `tp-07-navigation-legacy`
- **Commit :** *(à créer)*

## Architecture du corrigé

### Migration Réalisée

| Avant (React Navigation v6) | Après (Expo Router v3) |
|---|---|
| `src/navigation/AppNavigator.tsx` | `app/_layout.tsx` — Stack + auth guard |
| `src/navigation/TabNavigator.tsx` | `app/(tabs)/_layout.tsx` — Tab navigator |
| `src/navigation/types.ts` | Supprimé — types gérés par le FS |
| `src/components/AuthGuard.tsx` | Supprimé — guard inline dans `_layout.tsx` |
| `src/screens/HomeScreen.tsx` | `app/(tabs)/index.tsx` |
| `src/screens/ProductsScreen.tsx` | `app/(tabs)/products.tsx` |
| `src/screens/ProductDetailScreen.tsx` | `app/product/[id].tsx` — route dynamique |
| `src/screens/LoginScreen.tsx` | `app/login.tsx` — modal |
| `App.tsx` (entry point custom) | `export { default } from 'expo-router'` |

### Fichiers conservés / adaptés
- `src/context/AuthContext.tsx` — Adapté pour supporter l'état `null` (loading), exporte désormais `useAuth`
- `src/hooks/useAuth.ts` — Re-export de `useAuth` depuis AuthContext

## Décisions techniques

1. **Routage fichier** : Expo Router remplace le routage manuel React Navigation. Chaque écran est un fichier dans `app/`.
2. **Auth guard** : Implémenté dans `app/_layout.tsx` avec `useSegments()` + `Redirect` plutôt qu'un composant wrapper `AuthGuard`.
3. **Route dynamique** : `app/product/[id].tsx` crée une route paramétrée, accessible en deep link via `rnadv-tp07://product/{id}`.
4. **Layout imbriqué** : `(tabs)` est un group de routes avec son propre `_layout.tsx` pour la TabBar.
5. **Schéma de deep link** : Configuré dans `app.json` via `"scheme": "rnadv-tp07"`.
6. **Dépendances** : `@react-navigation/*` supprimées, `expo-router` bundle React Navigation en interne.

## Structure finale des fichiers
```
app/
├── _layout.tsx          # Root Stack + Auth guard
├── login.tsx            # Modal de connexion
├── (tabs)/
│   ├── _layout.tsx      # Tab navigator
│   ├── index.tsx        # Page d'accueil
│   └── products.tsx     # Liste des produits
└── product/
    └── [id].tsx         # Détail produit (route dynamique)
src/
├── context/
│   └── AuthContext.tsx   # Contexte d'authentification
└── hooks/
    └── useAuth.ts        # Re-export du hook useAuth
```
