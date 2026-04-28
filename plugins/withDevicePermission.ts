import { ConfigPlugin, withAndroidManifest } from 'expo/config-plugins';

const withDevicePermission: ConfigPlugin = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;
    if (!androidManifest['uses-permission']) {
      androidManifest['uses-permission'] = [];
    }
    const permissionExists = androidManifest['uses-permission']?.some(
      (perm: any) => perm['$']['android:name'] === 'android.permission.BATTERY_STATS'
    );
    if (!permissionExists) {
      androidManifest['uses-permission']?.push({
        $: { 'android:name': 'android.permission.BATTERY_STATS' },
      });
    }
    return config;
  });
};

export default withDevicePermission;
