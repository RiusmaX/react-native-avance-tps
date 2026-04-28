import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getBatteryLevel, getDeviceModel, getThermalState } from '../modules/device-info';

interface DeviceInfo {
  batteryLevel: number | null;
  deviceModel: string | null;
  thermalState: string | null;
}

export default function IndexScreen() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    batteryLevel: null,
    deviceModel: null,
    thermalState: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDeviceInfo() {
      try {
        const [battery, model, thermal] = await Promise.all([
          getBatteryLevel(),
          Promise.resolve(getDeviceModel()),
          getThermalState(),
        ]);
        setDeviceInfo({ batteryLevel: battery, deviceModel: model, thermalState: thermal });
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
        setLoading(false);
      }
    }
    loadDeviceInfo();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FF3000" />
        <Text style={styles.loadingText}>Chargement des informations...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>TP-02 : Expo Modules</Text>
        <Text style={styles.subtitle}>Module natif device-info</Text>
      </View>

      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
        </View>
      )}

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>🔋</Text>
          <Text style={styles.cardLabel}>Batterie</Text>
          <Text style={styles.cardValue}>{deviceInfo.batteryLevel}%</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>📱</Text>
          <Text style={styles.cardLabel}>Modèle</Text>
          <Text style={styles.cardValue}>{deviceInfo.deviceModel}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardIcon}>🌡️</Text>
          <Text style={styles.cardLabel}>État thermique</Text>
          <Text style={styles.cardValue}>{deviceInfo.thermalState}</Text>
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>Solution TP-02</Text>
        <Text style={styles.instructionsText}>
          Module natif device-info implémenté :{'
'}
          ✅ DeviceInfoModule.swift (iOS){'
'}
          ✅ DeviceInfoModule.kt (Android){'
'}
          ✅ Bridge TypeScript (requireNativeModule){'
'}
          ✅ Exports publics (index.ts){'
'}
          ✅ Config plugin BATTERY_STATS{'
'}
          ✅ Intégration UI complète
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#021023',
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF3000',
  },
  subtitle: {
    fontSize: 14,
    color: '#8899aa',
    marginTop: 4,
  },
  loadingText: {
    color: '#8899aa',
    textAlign: 'center',
    marginTop: 12,
  },
  cardsContainer: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#1a2a3a',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardIcon: {
    fontSize: 32,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF3000',
  },
  errorCard: {
    margin: 16,
    backgroundColor: '#3a1a1a',
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 13,
  },
  instructions: {
    margin: 16,
    padding: 16,
    backgroundColor: '#0d1b2a',
    borderRadius: 8,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8899aa',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 12,
    color: '#667788',
    lineHeight: 20,
  },
});
