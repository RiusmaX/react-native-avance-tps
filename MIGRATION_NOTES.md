# MIGRATION_NOTES.md — Corrigé TP-01
# ==========================================

## Audit initial

Procédure (il n'existe pas de CLI officiel pour l'audit New Arch) :
- Vérification des libs sur https://reactnative.directory (filtre "Supports the New Architecture")
- `npx react-native config` pour lister les modules autolinkés
- `grep` des APIs incompatibles (`findNodeHandle`, `UIManager.dispatchViewManagerCommand`, `NativeModules.*`)
- `npx @react-native-community/cli doctor` pour le diagnostic général

### Dépendances incompatibles
- `react-native-camera@3.44.0` ❌ Pas compatible New Architecture
  → Remplacé par `expo-camera` (SDK 55) ou suppression (le module n'est pas utilisé)

### Usages dépréciés dans le code source

| Fichier | API dépréciée | Correction |
|---------|---------------|------------|
| `src/components/UserList.tsx` | `findNodeHandle(ref)` + `UIManager.measure()` | `onLayout` natif + `getItemLayout` |
| `src/components/CameraPreview.tsx` | `UIManager.dispatchViewManagerCommand()` | `expo-camera` ou Fabric API directe |
| `src/modules/LegacyTempModule.ts` | `NativeModules.TempModule` | Codegen Turbo Module (→ TP-02) |

## Activation Hermes

### Avant
- iOS Podfile : `:hermes_enabled => false`
- Android gradle.properties : `hermesEnabled=false`

### Après
- ✅ iOS : `:hermes_enabled => true`
- ✅ Android : `hermesEnabled=true`

### Mesure TTI
- Avant Hermes : ~1.8s (JS thread, JIT)
- Après Hermes : ~1.1s (-39%)
- Méthode : `global.performance.now()` dans useEffect racine

## Activation New Architecture

### Avant
- `newArchEnabled=false`
- `fabric_enabled=false`

### Après
- ✅ `newArchEnabled=true`
- ✅ `fabric_enabled=true`

### Erreurs de compilation rencontrées
1. `Invariant Violation: findNodeHandle is not supported in Fabric` → corrigé
2. `NativeModules.TempModule is null` → migré vers commentaire Turbo Module
3. `RCTCamera native module not found` → dépendance incompatible supprimée

## Bilan final
- ✅ 0 usage de `findNodeHandle`
- ✅ 0 usage de `NativeModules` legacy
- ✅ Hermes activé (TTI : 1.8s → 1.1s)
- ✅ New Architecture activée
- ✅ Codegen stubs régénérés
