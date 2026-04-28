import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const PRODUCTS = Array.from({ length: 20 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `Produit ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 10,
  category: ['Électronique', 'Informatique', 'Mobile'][i % 3],
}));

export default function ProductsScreen() {
  const handleProductPress = useCallback((productId: string) => {
    router.push(`/product/${productId}`);
  }, []);

  const renderProduct = useCallback(
    ({ item }: { item: (typeof PRODUCTS)[0] }) => (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.productRow}>
          <Text style={styles.productPrice}>{item.price} €</Text>
          <Text style={styles.productCategory}>{item.category}</Text>
        </View>
      </TouchableOpacity>
    ),
    [handleProductPress]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Produits</Text>
      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  title: { fontSize: 28, fontWeight: '700', color: '#1a1a2e', padding: 20, paddingTop: 60 },
  list: { paddingHorizontal: 16 },
  productCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  productName: { fontSize: 17, fontWeight: '600', color: '#1a1a2e', marginBottom: 8 },
  productRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  productPrice: { fontSize: 20, fontWeight: '700', color: '#FF3000' },
  productCategory: { fontSize: 13, color: '#6b7280', backgroundColor: '#f3f4f6', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
});
