# TP-02 : Bridging Natif & Expo Modules

**Branche :** `tp-02-expo-modules`
**Module :** M4 — Bridging Natif & Expo Modules
**Durée :** 0h45
**Niveau :** ⬡⬡⬡ Avancé

## Contexte

Ce projet est une app **Expo SDK 55** avec un **squelette de module natif** `device-info`.
Votre mission : implémenter les 3 fonctions natives sur iOS et Android.

## API du module à créer

| Fonction | Type | Retour |
|----------|------|--------|
| `getBatteryLevel()` | Async | `Promise<number>` (0–100) |
| `getDeviceModel()` | Sync (JSI) | `string` |
| `getThermalState()` | Async | `Promise<string>` |

## Structure

```
modules/device-info/
├── index.ts               ← exports JS (TODO)
├── src/DeviceInfoModule.ts ← bridge TS (TODO)
├── ios/DeviceInfoModule.swift  ← implémentation iOS (TODO)
└── android/DeviceInfoModule.kt ← implémentation Android (TODO)
```

## Prérequis

```bash
npm install
npx create-expo-module modules/device-info --local  # scaffolding
```

## Étapes

1. **Scaffolding** : `create-expo-module --local`
2. **iOS (Swift)** : UIDevice + ProcessInfo
3. **Android (Kotlin)** : BatteryManager + Build + PowerManager
4. **Config Plugin** : permission BATTERY_STATS
5. **Intégration UI** : décommenter les imports dans `app/index.tsx`

## Corrigé

`git diff tp-02-expo-modules solution/tp-02`
