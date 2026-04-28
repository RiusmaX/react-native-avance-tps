# React Native Avancé — Projets de Travaux Pratiques

**Formation Sparks / SQLi — Mai 2025**  
*React Avancé pour développeurs React Native confirmés — 2 jours (14h)*

---

## 📋 Structure du dépôt

Ce dépôt unique contient les **7 Travaux Pratiques** de la formation. Chaque TP est isolé dans sa propre branche Git, avec son corrigé dans une branche `solution/tp-XX`.

```
rn-advanced-tp-projects/
├── main                          ← Vous êtes ici : README + guide de progression
│
├── tp-01-legacy-arch             ← TP-01 : Debugging Nouvelle Architecture
├── solution/tp-01                ←   → Corrigé du TP-01
│
├── tp-02-expo-modules            ← TP-02 : Bridging Natif & Expo Modules
│
├── tp-03-tanstack-starter        ← TP-03 : Data Layer (TanStack Query + GraphQL)
│
├── tp-04-tests-starter           ← TP-04 : Tests Avancés (MSW + Maestro)
│
├── tp-05-legacy-code             ← TP-05 : IA & Refactoring Agentique
│
├── tp-06-with-jank               ← TP-06 : Profiling & Correction de Jank
│
└── tp-07-navigation-legacy       ← TP-07 : Migration React Navigation → Expo Router
```

> 💡 **Les branches `solution/tp-XX` sont créées au fur et à mesure de la formation.**  
> Le formateur vous indiquera quand elles sont disponibles. Pas de triche 😉

---

## 🚀 Workflow participant

### 1. Cloner le dépôt (une seule fois)

```bash
git clone https://github.com/sparks-formation/rn-advanced-tp-projects.git
cd rn-advanced-tp-projects
```

### 2. Pour chaque TP, suivre ce cycle

```bash
# Étape A — Récupérer les dernières branches
git fetch --all

# Étape B — Switcher sur la branche du TP
git checkout tp-01-legacy-arch

# Étape C — Installer les dépendances (UNIQUEMENT la 1ʳᵉ fois sur cette branche)
npm install

# Étape D — Lire les consignes dans le README.md de la branche
#          ou ouvrir GUIDE_TPs.md pour les instructions détaillées

# Étape E — Faire le TP ! 😎

# Étape F — Voir le corrigé (quand il est disponible)
git diff tp-01-legacy-arch solution/tp-01
```

### 3. Passer au TP suivant

```bash
git checkout tp-02-expo-modules
npm install   # Ne pas oublier : chaque branche a ses propres dépendances
```

---

## 🗺️ Déroulé des 2 jours

### Jour 1 — Fondamentaux Techniques

| Horaire | Module | Durée | TP |
|---------|--------|-------|----|
| 09h00–09h30 | Intro & Histoire React Native | 30 min | — |
| 09h30–10h00 | Module 1 : Écosystème RN 2025 | 30 min | — |
| 10h00–11h00 | Module 2 : Nouvelle Architecture | 1h00 | — |
| **11h00–12h00** | **TP-01 : Debugging Nouvelle Architecture** | **1h00** | 🛠️ |
| 12h00–13h00 | 🍽️ Pause déjeuner | | |
| 13h00–14h00 | Module 3 : Expo vs Bare Workflow | 1h00 | — |
| 14h00–15h00 | Module 4 : Bridging Natif & Expo Modules | 1h00 | — |
| **15h00–15h45** | **TP-02 : Bridging Natif & Expo Modules** | **0h45** | 🛠️ |
| 15h45–16h00 | ☕ Pause | | |
| 16h00–17h00 | Module 5 : Data Layer Moderne | 1h00 | — |
| **17h00–17h30** | **TP-03 : TanStack Query + GraphQL** | **0h30** | 🛠️ |

### Jour 2 — Qualité & Performance

| Horaire | Module | Durée | TP |
|---------|--------|-------|----|
| 09h00–09h30 | Module 6 : Tests Avancés | 30 min | — |
| **09h30–10h00** | **TP-04 : Tests MSW + Maestro** | **0h30** | 🛠️ |
| 10h00–10h15 | ☕ Pause | | |
| 10h15–11h15 | Module 7 : IA & Développement Agentique | 1h00 | — |
| **11h15–11h35** | **TP-05 : IA & Refactoring Agentique** | **0h20** | 🛠️ |
| 11h35–13h00 | 🍽️ Pause déjeuner | | |
| 13h00–14h00 | Module 8 : Profiling & Performance | 1h00 | — |
| **14h00–14h30** | **TP-06 : Profiling & Correction de Jank** | **0h30** | 🛠️ |
| 14h30–14h45 | ☕ Pause | | |
| 14h45–16h15 | Module 9 : Expo Router | 1h30 | — |
| **16h15–16h40** | **TP-07 : Migration → Expo Router** | **0h25** | 🛠️ |
| 16h40–17h00 | Module 10 : Déploiement & Clôture | 20 min | — |

---

## 🔗 Dépendances entre les TPs

```
TP-01 (Legacy Arch) ─────────────────────> TP-02 (Expo Modules)
                                                │
                          ┌─────────────────────┤
                          ▼                     ▼
                   TP-03 (Data Layer)     TP-07 (Expo Router)
                          │
                          ▼
                   TP-04 (Tests)
                          │
                          ▼
                   TP-06 (Profiling)

TP-05 (IA Refactoring) ──> (autonome, faisable à tout moment)
```

| Relation | Explication |
|----------|-------------|
| TP-01 → TP-02 | Le bonus du TP-01 (migrer `NativeModules` → Turbo Module) prépare le TP-02 |
| TP-02 → TP-03 | Le projet TP-02 sert de base ; on ajoute un onglet "Posts" avec TanStack Query |
| TP-03 → TP-04 | Les hooks TanStack Query du TP-03 sont testés dans le TP-04 (MSW) |
| TP-04 → TP-06 | L'app testée dans TP-04 est une variante de celle profilée dans TP-06 |
| TP-05 | Projet minimal, complètement autonome |
| TP-07 | Indépendant du stack technique des autres TPs |

---

## 📚 Les 7 TPs en détail

### TP-01 — Debugging Nouvelle Architecture

| | |
|---|---|
| **Branche** | `tp-01-legacy-arch` |
| **Module** | M2 — Nouvelle Architecture |
| **Durée** | 1h00 |
| **Niveau** | ⬡⬡ Intermédiaire |
| **Technos** | RN CLI 0.71, Bridge, Hermes |
| **Backend requis** | ❌ Non |

**Objectif :** Auditer et corriger un projet React Native ancienne architecture pour le rendre compatible New Architecture.

**Problèmes à corriger :**
1. `findNodeHandle(ref)` déprécié → `onLayout` natif
2. `NativeModules.TempModule` via Bridge → Turbo Module
3. `UIManager.dispatchViewManagerCommand()` legacy → Fabric API
4. Dépendance `react-native-camera@3.44.0` incompatible

**Livrable :** `MIGRATION_NOTES.md` complété + app qui démarre avec `newArchEnabled=true`

```bash
git checkout tp-01-legacy-arch
npm install
# Suivre les instructions dans README.md de la branche
git diff tp-01-legacy-arch solution/tp-01   # Voir le corrigé
```

---

### TP-02 — Bridging Natif & Expo Modules

| | |
|---|---|
| **Branche** | `tp-02-expo-modules` |
| **Module** | M4 — Bridging Natif & Expo Modules |
| **Durée** | 0h45 |
| **Niveau** | ⬡⬡⬡ Avancé |
| **Technos** | Expo SDK 55, Swift, Kotlin, JSI |
| **Backend requis** | ❌ Non |

**Objectif :** Créer un module natif `device-info` complet sur iOS (Swift) et Android (Kotlin) avec Expo Modules API.

**API à implémenter :**
- `getBatteryLevel()` — niveau de batterie (0–100)
- `getDeviceModel()` — modèle de l'appareil (synchrone via JSI)
- `getThermalState()` — état thermique

**Config Plugin :** Ajouter la permission `BATTERY_STATS` dans AndroidManifest.xml

```bash
git checkout tp-02-expo-modules
npm install
npx create-expo-module modules/device-info --local
```

---

### TP-03 — Data Layer (TanStack Query + GraphQL)

| | |
|---|---|
| **Branche** | `tp-03-tanstack-starter` |
| **Module** | M5 — Data Layer Moderne |
| **Durée** | 0h30 |
| **Niveau** | ⬡⬡ Intermédiaire |
| **Technos** | TanStack Query v5, GraphQL, Yoga + SQLite |
| **Backend requis** | ✅ Oui (fourni dans `03-backend-graphql/`) |

**Objectif :** Connecter l'application à un backend GraphQL avec TanStack Query pour remplacer Redux.

**À implémenter :**
1. `useInfiniteQuery` avec pagination (20 posts par page)
2. `useQuery` pour un post individuel
3. `useMutation` avec invalidation du cache
4. 🏆 Bonus : optimistic update

```bash
# Terminal 1 — Backend (à garder allumé)
cd 03-backend-graphql && npm install && npm run seed && npm start

# Terminal 2 — App
git checkout tp-03-tanstack-starter && npm install && npx expo start
```

---

### TP-04 — Tests Avancés (MSW + Maestro)

| | |
|---|---|
| **Branche** | `tp-04-tests-starter` |
| **Module** | M6 — Tests Avancés |
| **Durée** | 0h30 (2 × 15 min) |
| **Niveau** | ⬡⬡ Intermédiaire |
| **Technos** | Jest, RTL, MSW, Maestro |
| **Backend requis** | ⚡ Optionnel (MSW mocke le réseau) |

**Objectif :** Écrire des tests unitaires avec MSW (mocking réseau) et un test E2E avec Maestro.

**Partie A — MSW (15 min) :**
- Test 1 : Chargement réussi (posts affichés)
- Test 2 : Erreur 500 (message d'erreur)
- 🏆 Bonus : Skeleton de chargement

**Partie B — Maestro (15 min) :**
- Flow : browse → détail → retour

```bash
git checkout tp-04-tests-starter && npm install
npm test                              # Tests MSW
npx expo run:ios                      # Lancer l'app pour Maestro
maestro test .maestro/flows/browse_posts.yaml
```

---

### TP-05 — IA & Refactoring Agentique

| | |
|---|---|
| **Branche** | `tp-05-legacy-code` |
| **Module** | M7 — IA & Développement Agentique |
| **Durée** | 0h20 |
| **Niveau** | ⬡ Tous niveaux |
| **Technos** | Claude Code / Cursor / Copilot |
| **Backend requis** | ❌ Non |

**Objectif :** Utiliser un agent de code pour refactoriser un composant classe legacy de 120 lignes.

**Composant à refactoriser :** `src/components/UserProfile.tsx`
- ❌ Composant classe
- ❌ PropTypes au lieu de TypeScript
- ❌ Logique métier mélangée à l'UI
- ❌ Appels API dans `componentDidMount`
- ❌ Pas de tests

**Prompt recommandé :**
```
Contexte : projet React Native avec Expo SDK 55, TypeScript strict, TanStack Query v5.
Refactorise UserProfile.tsx : convertis en fonctionnel + hooks,
extrais useUserProfile(userId) avec TanStack Query,
ajoute TypeScript strict, génère un test Jest + RTL.
```

```bash
git checkout tp-05-legacy-code
# Ouvrir dans votre outil IA préféré
code src/components/UserProfile.tsx
```

---

### TP-06 — Profiling & Correction de Jank

| | |
|---|---|
| **Branche** | `tp-06-with-jank` |
| **Module** | M8 — Profiling & Performance |
| **Durée** | 0h30 |
| **Niveau** | ⬡⬡⬡ Avancé |
| **Technos** | React DevTools, Reanimated 3, Xcode/Android Profiler |
| **Backend requis** | ❌ Non |

**Objectif :** Diagnostiquer et corriger 4 problèmes de performance dans une app qui "jank".

**Problèmes à corriger :**

| # | Fichier | Problème | Correction |
|---|---------|----------|------------|
| 1 | `PostCard.tsx` | Re-renders excessifs | `React.memo` + `useCallback` |
| 2 | `Header.tsx` | Calcul lourd inline | `useMemo` |
| 3 | `AnimatedLike.tsx` | Animation JS thread → saccades | Reanimated 3 (UI thread) |
| 4 | `useFeed.ts` | Fuite mémoire (subscription) | `useEffect` cleanup |

**Outils de diagnostic :**
- React DevTools Profiler (re-renders)
- Xcode Instruments / Android Profiler (thread JS)
- Flipper (logs, réseau)

```bash
git checkout tp-06-with-jank && npm install && npx expo start
npx react-devtools   # Profiler React
```

---

### TP-07 — Migration React Navigation → Expo Router

| | |
|---|---|
| **Branche** | `tp-07-navigation-legacy` |
| **Module** | M9 — Expo Router & Navigation Moderne |
| **Durée** | 0h25 |
| **Niveau** | ⬡⬡⬡ Avancé |
| **Technos** | React Navigation v6 (départ), Expo Router v3 (arrivée) |
| **Backend requis** | ❌ Non |

**Objectif :** Migrer une app React Navigation (Stack + Tabs + AuthGuard) vers Expo Router (file-based routing).

**Architecture de départ (React Navigation) :**
```
NavigationContainer > NativeStack
  ├── MainTabs (BottomTabNavigator)
  │   ├── Home → HomeScreen
  │   └── Products → ProductsScreen
  ├── ProductDetail → ProductDetailScreen (params: productId)
  └── Login → LoginScreen (modal)
```

**Architecture cible (Expo Router) :**
```
app/
├── _layout.tsx                       ← Root Stack + Guard
├── (tabs)/
│   ├── _layout.tsx                   ← Bottom Tab Layout
│   ├── index.tsx                      ← Home
│   └── products.tsx                   ← Products
├── product/
│   └── [id].tsx                       ← Détail produit (route dynamique)
└── login.tsx                          ← Modal
```

**5 étapes :**
1. Installer `expo-router`, configurer `scheme` dans `app.json`
2. Créer `app/_layout.tsx` (Stack) → remplacer `NavigationContainer`
3. Créer `app/(tabs)/_layout.tsx` + écrans
4. Route dynamique `app/product/[id].tsx`
5. Guard d'auth avec `useSegments` + `Redirect`

```bash
git checkout tp-07-navigation-legacy && npm install
# Suivre les 5 étapes dans le README de la branche
```

---

## 🛠️ Prérequis techniques

| Outil | Version | Vérification |
|-------|---------|-------------|
| Node.js | 20.x LTS | `node --version` |
| npm | 10.x | `npm --version` |
| Expo CLI | 0.18+ | `npx expo --version` |
| Git | 2.x | `git --version` |
| Xcode (macOS) | 15+ | `xcodebuild -version` |
| Android Studio | Hedgehog+ | `adb --version` |
| Maestro | 1.38+ | `maestro --version` |

### Installation rapide

```bash
# Expo CLI
npm install -g expo-cli

# Maestro (macOS / Linux)
curl -Ls "https://get.maestro.mobile.dev" | bash

# Maestro (Windows PowerShell)
iwr -useb "https://get.maestro.mobile.dev/windows" | iex
```

---

## 💡 Commandes de référence rapide

```bash
# Changer de branche
git checkout tp-03-tanstack-starter
npm install

# Voir le diff avec le corrigé
git diff tp-03-tanstack-starter solution/tp-03

# Lancer le backend GraphQL
cd 03-backend-graphql && npm run seed && npm start

# Profiler l'application
npx react-devtools

# Lancer les tests
npm test

# Flow Maestro
maestro test .maestro/flows/browse_posts.yaml

# Créer un module Expo natif
npx create-expo-module modules/mon-module --local

# Conversion WebP des assets
npx sharp-cli --input "assets/images/*.png" --output "assets/webp/" --format webp --quality 80
```

---

## 📖 Ressources

| Sujet | Lien |
|-------|------|
| Documentation complète des TPs | [GUIDE_TPs.md](./GUIDE_TPs.md) |
| Spécifications techniques | [SPECS_TP.md](./SPECS_TP.md) |
| New Architecture RN | https://reactnative.dev/docs/the-new-architecture/landing-page |
| Expo Modules API | https://docs.expo.dev/modules/module-api/ |
| TanStack Query | https://tanstack.com/query/latest/docs/framework/react/overview |
| Maestro | https://maestro.mobile.dev/getting-started/writing-your-first-flow |
| FlashList | https://shopify.github.io/flash-list/docs/ |
| Reanimated 3 | https://docs.swmansion.com/react-native-reanimated/ |
| Expo Router | https://docs.expo.dev/router/introduction/ |

---

## 📝 Licence

Ce projet est fourni à titre pédagogique dans le cadre de la formation **Sparks / SQLi — Mai 2025**.  
Reproduction interdite sans autorisation écrite.

---

*Document généré le — Formation React Native Avancé · 2 jours (14h)*