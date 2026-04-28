import { NativeModules } from 'react-native';

// Problème 2 : NativeModules.TempModule (ancienne API Bridge)
// Dans la New Architecture, ce module devrait être un Turbo Module typé
// avec codegen et un podspec/expo-module.config.

interface LegacyTempModuleInterface {
  getDeviceTemperature(): Promise<number>;
  startMonitoring(): void;
  stopMonitoring(): void;
  readonly isMonitoring: boolean;
}

// ❌ NativeModules n'est pas typé et ne fonctionne pas avec Fabric
// Dans la New Architecture, il faut importer depuis un module généré par Codegen
const TempModule =
  NativeModules.TempModule as LegacyTempModuleInterface;

if (!TempModule) {
  console.warn(
    '[LegacyTempModule] TempModule non trouvé — ' +
      'le module natif n\'a pas été linké correctement. ' +
      'Vérifier que react-native link a été exécuté.'
  );
}

// Wrapper legacy avec fallback
export const LegacyTempModule = TempModule ?? {
  getDeviceTemperature: async (): Promise<number> => {
    console.warn('[LegacyTempModule] Fallback : température simulée');
    return 42;
  },
  startMonitoring: () => {
    console.warn('[LegacyTempModule] Fallback : monitoring non disponible');
  },
  stopMonitoring: () => {
    console.warn('[LegacyTempModule] Fallback : arrêt non disponible');
  },
  isMonitoring: false,
};

export type { LegacyTempModuleInterface };
