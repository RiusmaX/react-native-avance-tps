# TP-05 : IA & Refactoring Agentique — CORRIGÉ

**Branche :** `solution/tp-05`
**Module :** M7 — IA & Développement Agentique
**Durée :** 0h20
**Niveau :** ⬡ Tous niveaux

## Ce que contient le corrigé

| Fichier | Avant (legacy) | Après (refactor) |
|---------|----------------|-------------------|
| `src/components/UserProfile.tsx` | Classe React, ~120 lignes, fetch + UI mélangés | Composant fonctionnel, ~100 lignes, focus UI |
| `src/hooks/useUserProfile.ts` | inexistant | Hook TanStack Query avec sous-query posts |
| `src/utils/apiHelper.ts` | `apiHelper.js` sans types, mute ses paramètres | TS strict, classe `ApiError`, fonction pure `deriveUserFields` |
| `src/utils/format.ts` | `formatJoinDate` inline | Pure function, gère null/invalid |
| `__tests__/useUserProfile.test.ts` | aucun test | 3 tests : succès, userId vide, erreur 404 |
| `__tests__/format.test.ts` | aucun test | 3 cas : null, invalide, ISO français |

## Avant / Après en chiffres

- Lignes de logique métier dans `UserProfile.tsx` : 120 → 0 (tout extrait)
- `setState` callbacks : 4 → 0 (TanStack gère)
- `any` implicites : 8 → 0 (`strict: true`)
- Tests : 0 → 6

## Lancer les tests

```bash
npm install
npm test          # Jest
npm run typecheck # tsc --noEmit
```

## Diff vs starter

```bash
git diff tp-05-legacy-code solution/tp-05 -- src/
```

## Pourquoi ce TP est court (20 min)

L'objectif n'est PAS d'écrire toutes ces lignes à la main, mais de :

1. Donner un prompt précis à un agent IA (Claude Code, Cursor, Copilot)
2. **Évaluer** le résultat à l'aide de la grille
3. Comprendre où l'agent excelle et où il déraille

Le corrigé sert de **référence de qualité** : il montre à quoi ressemble un refactor "complet". L'agent doit produire au minimum le composant fonctionnel + le hook ; le reste est bonus.

## Bonus — `.claude/CLAUDE.md`

Le starter contient un fichier `.claude/CLAUDE.md` avec des règles projet. Re-lance le refactor avec ces règles activées : l'agent devrait être plus rigoureux sur le typage strict et l'extraction de hooks.
