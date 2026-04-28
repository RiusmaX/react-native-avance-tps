# TP-01 : Debugging Nouvelle Architecture

**Branche :** `tp-01-legacy-arch`
**Module :** M2 — Nouvelle Architecture React Native
**Durée :** 1h00
**Niveau :** ⬡⬡ Intermédiaire

## Contexte

Ce projet utilise **React Native 0.71** avec **l'ancienne architecture** (Bridge).
Votre mission : auditer les incompatibilités, activer Hermes + la New Architecture,
et corriger les usages dépréciés.

## Problèmes intentionnels

| # | Fichier | Problème |
|---|---------|----------|
| 1 | `src/components/UserList.tsx` | `findNodeHandle(ref)` déprécié |
| 2 | `src/modules/LegacyTempModule.ts` | `NativeModules.TempModule` via Bridge legacy |
| 3 | `src/components/CameraPreview.tsx` | `UIManager.dispatchViewManagerCommand()` legacy |
| 4 | `package.json` | `react-native-camera@3.44.0` incompatible New Arch |

## Étapes

1. **Auditer** : `npx react-native-new-architecture-helper`
2. **Activer Hermes** : `Podfile` + `gradle.properties`
3. **Activer New Arch** : `newArchEnabled=true`
4. **Corriger** les usages dépréciés
5. **Documenter** dans `MIGRATION_NOTES.md`

## Corrigé

`git diff tp-01-legacy-arch solution/tp-01`
