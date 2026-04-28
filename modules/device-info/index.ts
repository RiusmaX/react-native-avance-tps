// TP-02 : Module device-info — Exports TypeScript
// 🔲 TODO : Implémenter les 3 fonctions après avoir créé le module natif

/**
 * Récupère le niveau de batterie (0–100)
 * @async
 * @returns {Promise<number>} Niveau de batterie en pourcentage
 */
export async function getBatteryLevel(): Promise<number> {
  throw new Error(
    '[device-info] getBatteryLevel() non implémenté. ' +
    'Complétez DeviceInfoModule.swift et DeviceInfoModule.kt'
  );
}

/**
 * Récupère le modèle de l'appareil (synchrone via JSI)
 * @returns {string} Modèle de l'appareil
 */
export function getDeviceModel(): string {
  throw new Error(
    '[device-info] getDeviceModel() non implémenté. ' +
    'Complétez DeviceInfoModule.swift et DeviceInfoModule.kt'
  );
}

/**
 * Récupère l'état thermique de l'appareil
 * @async
 * @returns {Promise<'nominal' | 'fair' | 'serious' | 'critical'>} État thermique
 */
export async function getThermalState(): Promise<string> {
  throw new Error(
    '[device-info] getThermalState() non implémenté. ' +
    'Complétez DeviceInfoModule.swift et DeviceInfoModule.kt'
  );
}
