import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthGuard } from '../components/AuthGuard';
import type { ProductsScreenProps } from '../navigation/types';

const PRODUCTS = Array.from({ length: 20 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `Produit ${i + 1}`,
  price: Math.floor(Math.random() * 100) + 10,
  category: ['Électronique', 'Mode', 'Maison', 'Sport'][i % 4],
}));

export default function ProductsScreen({ navigation }: ProductsScreenProps) {
  return (
    <AuthGuard>
      <View style={styles.container}>
        <Text style={styles.title}>Produits</Text>
        <FlatList
          data={PRODUCTS}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCategory}>{item.category}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price} €</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: '700', padding: 16, paddingBottom: 8, color: '#021023' },
  list: { padding: 16, paddingTop: 8 },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '600', color: '#333' },
  itemCategory: { fontSize: 12, color: '#999', marginTop: 2 },
  itemPrice: { fontSize: 18, fontWeight: '700', color: '#FF3000' },
});
