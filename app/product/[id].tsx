import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Produit #${id}` }} />
      <View style={styles.content}>
        <Text style={styles.label}>Produit #{id}</Text>
        <Text style={styles.description}>
          Cette page utilise le routage dynamique d'Expo Router :{' '}
          <Text style={styles.code}>app/product/[id].tsx</Text>
        </Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Deep link</Text>
          <Text style={styles.infoText}>
            Accessible via : <Text style={styles.code}>rnadv-tp07://product/{id}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 20 },
  label: { fontSize: 28, fontWeight: '700', color: '#1a1a2e', marginBottom: 16 },
  description: { fontSize: 15, color: '#6b7280', lineHeight: 22, marginBottom: 24 },
  code: { fontFamily: 'monospace', backgroundColor: '#f3f4f6', color: '#FF3000', fontSize: 13, fontWeight: '600' },
  infoCard: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  infoTitle: { fontSize: 17, fontWeight: '600', color: '#1a1a2e', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#6b7280', lineHeight: 20 },
});
