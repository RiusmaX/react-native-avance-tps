# React Native Avancé — Projets de TP

**Formation Sparks / SQLi — Mai 2025**

Dépôt unique contenant les 7 Travaux Pratiques de la formation React Native Avancé.

## Structure

```
rn-advanced-tp-projects/
├── main                    ← README + structure (vous êtes ici)
├── tp-01-legacy-arch       ← TP-01 : Debugging Nouvelle Architecture
├── tp-02-expo-modules      ← TP-02 : Bridging Natif & Expo Modules
├── tp-03-tanstack-starter  ← TP-03 : Data Layer (TanStack Query + GraphQL)
├── tp-04-tests-starter     ← TP-04 : Tests Avancés (MSW + Maestro)
├── tp-05-legacy-code       ← TP-05 : IA & Refactoring Agentique
├── tp-06-with-jank         ← TP-06 : Profiling & Correction de Jank
└── tp-07-navigation-legacy ← TP-07 : Migration React Navigation → Expo Router
```

## Workflow

```bash
# 1. Cloner le dépôt
git clone https://github.com/sparks-formation/rn-advanced-tp-projects.git
cd rn-advanced-tp-projects

# 2. Pour chaque TP, switcher de branche
git checkout tp-01-legacy-arch
npm install
# ... faire le TP ...

# 3. Voir le corrigé
git diff tp-01-legacy-arch solution/tp-01

# 4. Passer au TP suivant
git checkout tp-02-expo-modules
npm install
# ...
```

## Les 7 TPs

| TP | Sujet | Durée | Niveau | Branche |
|----|-------|-------|--------|---------|
| 01 | Debugging Nouvelle Architecture | 1h00 | ⬡⬡ Intermédiaire | `tp-01-legacy-arch` |
| 02 | Bridging Natif & Expo Modules | 0h45 | ⬡⬡⬡ Avancé | `tp-02-expo-modules` |
| 03 | Data Layer (TanStack Query + GraphQL) | 0h30 | ⬡⬡ Intermédiaire | `tp-03-tanstack-starter` |
| 04 | Tests Avancés (MSW + Maestro) | 0h30 | ⬡⬡ Intermédiaire | `tp-04-tests-starter` |
| 05 | IA & Refactoring Agentique | 0h20 | ⬡ Tous niveaux | `tp-05-legacy-code` |
| 06 | Profiling & Correction de Jank | 0h30 | ⬡⬡⬡ Avancé | `tp-06-with-jank` |
| 07 | Migration React Navigation → Expo Router | 0h25 | ⬡⬡⬡ Avancé | `tp-07-navigation-legacy` |

## Branches de solution

Les corrigés sont disponibles sur les branches `solution/tp-XX`. Utilisez `git diff` pour comparer votre code au corrigé :

```bash
git checkout tp-01-legacy-arch
git diff solution/tp-01
```

## Licence

Ce projet est fourni à titre pédagogique dans le cadre de la formation Sparks / SQLi.
