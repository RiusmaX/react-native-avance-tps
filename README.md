# TP-05 : IA & Refactoring Agentique

**Branche :** tp-05-legacy-code
**Module :** M7 - IA & Developpement Agentique
**Duree :** 0h20
**Niveau :** Tous niveaux

## Contexte

Un composant classe legacy de ~120 lignes a refactoriser.
Utilisez l'outil IA de votre choix (Claude Code, Cursor, Copilot).

## Probleme

Le composant UserProfile.tsx contient :
- Composant classe au lieu de fonctionnel
- PropTypes au lieu de TypeScript
- Logique metier melangee a l'UI
- Appels API directs (pas TanStack Query)
- Pas de tests

## Mission

Donnez cette instruction a votre agent :

"Refactorise UserProfile.tsx : convertis en composant fonctionnel,
extrais la logique dans useUserProfile(userId) avec TanStack Query,
ajoute TypeScript strict, genere un test Jest + RTL."

## Bonus

Creer .claude/CLAUDE.md avec les regles projet et relancer.
