import { requireNativeModule } from 'expo-modules-core';

interface DeviceInfoNativeModule {
  getBatteryLevel(): Promise<number>;
  getDeviceModel(): string;
  getThermalState(): Promise<string>;
}

const DeviceInfoModule = requireNativeModule<DeviceInfoNativeModule>('DeviceInfo');
export default DeviceInfoModule;
