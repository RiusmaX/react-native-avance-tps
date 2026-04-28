import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// 🔲 TODO TP-02 : Importer les fonctions du module device-info
// import { getBatteryLevel, getDeviceModel, getThermalState } from '../modules/device-info';

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
        // 🔲 TODO : Décommenter après implémentation du module
        // const [battery, model, thermal] = await Promise.all([
        //   getBatteryLevel(),
        //   Promise.resolve(getDeviceModel()),
        //   getThermalState(),
        // ]);
        // setDeviceInfo({ batteryLevel: battery, deviceModel: model, thermalState: thermal });

        // Simulation temporaire
        setDeviceInfo({
          batteryLevel: null,
          deviceModel: null,
          thermalState: null,
        });
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
        {/* 🔲 Batterie — à débloquer après implémentation du module */}
        <View style={[styles.card, deviceInfo.batteryLevel === null && styles.cardEmpty]}>
          {deviceInfo.batteryLevel !== null ? (
            <>
              <Text style={styles.cardIcon}>🔋</Text>
              <Text style={styles.cardLabel}>Batterie</Text>
              <Text style={styles.cardValue}>{deviceInfo.batteryLevel}%</Text>
            </>
          ) : (
            <>
              <Text style={styles.cardIcon}>🔲</Text>
              <Text style={styles.cardLabel}>Batterie</Text>
              <Text style={styles.cardTodo}>TODO : implémenter getBatteryLevel()</Text>
            </>
          )}
        </View>

        {/* 🔲 Modèle — à débloquer après implémentation du module */}
        <View style={[styles.card, deviceInfo.deviceModel === null && styles.cardEmpty]}>
          {deviceInfo.deviceModel !== null ? (
            <>
              <Text style={styles.cardIcon}>📱</Text>
              <Text style={styles.cardLabel}>Modèle</Text>
              <Text style={styles.cardValue}>{deviceInfo.deviceModel}</Text>
            </>
          ) : (
            <>
              <Text style={styles.cardIcon}>🔲</Text>
              <Text style={styles.cardLabel}>Modèle</Text>
              <Text style={styles.cardTodo}>TODO : implémenter getDeviceModel()</Text>
            </>
          )}
        </View>

        {/* 🔲 Thermique — à débloquer après implémentation du module */}
        <View style={[styles.card, deviceInfo.thermalState === null && styles.cardEmpty]}>
          {deviceInfo.thermalState !== null ? (
            <>
              <Text style={styles.cardIcon}>🌡️</Text>
              <Text style={styles.cardLabel}>État thermique</Text>
              <Text style={styles.cardValue}>{deviceInfo.thermalState}</Text>
            </>
          ) : (
            <>
              <Text style={styles.cardIcon}>🔲</Text>
              <Text style={styles.cardLabel}>État thermique</Text>
              <Text style={styles.cardTodo}>TODO : implémenter getThermalState()</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>Instructions</Text>
        <Text style={styles.instructionsText}>
          1. Implémentez DeviceInfoModule.swift (iOS){'\n'}
          2. Implémentez DeviceInfoModule.kt (Android){'\n'}
          3. Complétez index.ts avec les exports{'\n'}
          4. Activez le config plugin withDevicePermission{'\n'}
          5. Décommentez les imports dans app/index.tsx
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
  cardEmpty: {
    opacity: 0.6,
    borderWidth: 1,
    borderColor: '#FF3000',
    borderStyle: 'dashed',
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
  cardTodo: {
    fontSize: 11,
    color: '#FF3000',
    fontStyle: 'italic',
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
