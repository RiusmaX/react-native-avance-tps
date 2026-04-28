import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import UserList from '../components/UserList';
import CameraPreview from '../components/CameraPreview';
import { LegacyTempModule } from '../modules/LegacyTempModule';

const HomeScreen: React.FC = () => {
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    // Utilisation du module legacy
    LegacyTempModule.getDeviceTemperature()
      .then((temp) => {
        setTemperature(temp);
        console.log('[HomeScreen] Température mesurée:', temp);
      })
      .catch((err: Error) => {
        console.error('[HomeScreen] Erreur température:', err.message);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>TP-01 : Legacy Architecture</Text>
        <Text style={styles.headerSubtitle}>
          Détection des incompatibilités New Architecture
        </Text>
        {temperature !== null && (
          <View style={styles.tempBadge}>
            <Text style={styles.tempText}>
              🌡️ Température : {temperature}°C
            </Text>
          </View>
        )}
      </View>

      <UserList />
      <CameraPreview />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    backgroundColor: '#021023',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF3000',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8899aa',
    marginTop: 4,
  },
  tempBadge: {
    marginTop: 12,
    backgroundColor: '#1a2a3a',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  tempText: {
    color: '#fff',
    fontSize: 13,
  },
});

export default HomeScreen;
