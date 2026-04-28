import DeviceInfoModule from './src/DeviceInfoModule';

export function getBatteryLevel(): Promise<number> {
  return DeviceInfoModule.getBatteryLevel();
}

export function getDeviceModel(): string {
  return DeviceInfoModule.getDeviceModel();
}

export function getThermalState(): Promise<string> {
  return DeviceInfoModule.getThermalState();
}

export { DeviceInfoModule };
