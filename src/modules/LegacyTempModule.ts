// Solution TP-01 — LegacyTempModule migré vers Turbo Module
// Dans la New Architecture, ce module doit être implémenté via Codegen.
// Voir TP-02 pour l'implémentation complète avec Expo Modules.

/*
 * ✅ Solution : Turbo Module typé (à générer via Codegen)
 *
 * // TurboModulesRegistry.h
 * @interface NativeTempModuleSpec : NSObject <RCTTurboModule>
 * @end
 *
 * // TempModule.ts (codegen)
 * import { TurboModule, TurboModuleRegistry } from 'react-native';
 * interface Spec extends TurboModule {
 *   readonly getDeviceTemperature: () => Promise<number>;
 *   readonly startMonitoring: () => void;
 *   readonly stopMonitoring: () => void;
 * }
 * export default TurboModuleRegistry.getEnforcing<Spec>('TempModule');
 */

// Fallback : message indiquant la migration nécessaire
export const LegacyTempModule = {
  getDeviceTemperature: async (): Promise<number> => {
    console.warn(
      '[LegacyTempModule] Migration nécessaire vers Turbo Module. ' +
      'Utiliser le module généré par Codegen à la place.'
    );
    return 42;
  },
  startMonitoring: () => {
    console.warn('[LegacyTempModule] Migrer vers Turbo Module');
  },
  stopMonitoring: () => {
    console.warn('[LegacyTempModule] Migrer vers Turbo Module');
  },
  isMonitoring: false,
};
