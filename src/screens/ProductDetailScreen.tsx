import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { RootStackScreenProps } from '../navigation/types';

export default function ProductDetailScreen({ route }: RootStackScreenProps<'ProductDetail'>) {
  const { productId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produit #{productId}</Text>
      <Text style={styles.description}>
        Page de détail du produit {productId}. Cette page utilise une route
        dynamique — dans Expo Router, elle deviendra app/product/[id].tsx.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', color: '#021023', marginBottom: 12 },
  description: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 22 },
});
