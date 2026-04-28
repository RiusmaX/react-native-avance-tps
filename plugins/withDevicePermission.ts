// TP-02 : Config Plugin — Permission batterie Android
// 🔲 TODO : Implémenter le config plugin pour ajouter BATTERY_STATS

import { ConfigPlugin, withAndroidManifest } from 'expo/config-plugins';

/**
 * Ajoute la permission BATTERY_STATS dans AndroidManifest.xml
 * Nécessaire pour accéder aux informations de batterie sur Android.
 *
 * 🔲 À implémenter :
 * 1. Ajouter <uses-permission android:name="android.permission.BATTERY_STATS" />
 *    dans le manifest Android
 * 2. Tester avec `npx expo prebuild --clean`
 */
const withDevicePermission: ConfigPlugin = (config) => {
  // 🔲 TODO : utiliser withAndroidManifest pour ajouter la permission
  // const androidManifest = config.modResults.manifest;

  return config;
};

export default withDevicePermission;
