// TP-02 : Module natif device-info — Module TypeScript (bridge)
// 🔲 TODO : Compléter après avoir créé le module avec create-expo-module

// Ce fichier sera régénéré par `npx create-expo-module modules/device-info --local`
// Il sert de pont entre les appels TypeScript et les implémentations native Swift/Kotlin.

// import { requireNativeModule } from 'expo-modules-core';

// // 🔲 TODO : Décommenter après avoir créé le module avec create-expo-module
// const DeviceInfoModule = requireNativeModule('DeviceInfo');

// export default DeviceInfoModule;

export default {
  getBatteryLevel: async (): Promise<number> => {
    throw new Error('[DeviceInfoModule] Module natif non créé. Lancer create-expo-module d\'abord.');
  },
  getDeviceModel: (): string => {
    throw new Error('[DeviceInfoModule] Module natif non créé. Lancer create-expo-module d\'abord.');
  },
  getThermalState: async (): Promise<string> => {
    throw new Error('[DeviceInfoModule] Module natif non créé. Lancer create-expo-module d\'abord.');
  },
};
