# Règles du projet React Native Avancé

## Conventions générales
- **TypeScript strict** obligatoire — pas de `any`
- **Composants fonctionnels** avec hooks (pas de classes)
- **TanStack Query** pour tous les appels API
- **Hooks personnalisés** pour la logique métier réutilisable
- **Tests Jest + RTL** pour les hooks et composants

## Structure des fichiers
- `src/hooks/` — Hooks personnalisés (logique métier)
- `src/components/` — Composants UI (présentation)
- `src/utils/` — Utilitaires (API, helpers)

## Règles d'écriture
- Nommer les fichiers en kebab-case
- Exporter les composants en `export default`
- Documenter les hooks avec JSDoc
- Toujours gérer les états : loading, error, empty
- Pas de mutation des paramètres

## Règles ESLint implicites
- Pas de console.log dans le code de production
- Props destructurées dans la signature du composant
- Toujours utiliser `StyleSheet.create()` pour les styles
