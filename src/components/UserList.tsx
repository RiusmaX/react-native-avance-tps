import React, { useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  findNodeHandle,
  AccessibilityInfo,
} from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const MOCK_USERS: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: `Utilisateur ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Editor' : 'Viewer',
}));

// Problème 1 : findNodeHandle déprécié utilisé pour mesurer la hauteur
const UserList: React.FC = () => {
  const listRef = useRef<FlatList>(null);
  const [listHeight, setListHeight] = useState(0);

  const handleLayout = useCallback(() => {
    // ❌ findNodeHandle est déprécié depuis RN 0.73
    // Avec Fabric (New Arch), cette API plante
    const node = findNodeHandle(listRef.current);
    if (node) {
      // Tentative de mesure via UIManager (ancienne API)
      const { UIManager } = require('react-native');
      UIManager.measure(node, (x: number, y: number, w: number, h: number) => {
        setListHeight(h);
        console.log('[UserList] Hauteur mesurée via findNodeHandle:', h);
      });
    }
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{item.role}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <Text style={styles.title}>Liste des utilisateurs</Text>
      <Text style={styles.subtitle}>
        {MOCK_USERS.length} utilisateurs — Hauteur mesurée : {listHeight}px
      </Text>
      <FlatList
        ref={listRef}
        data={MOCK_USERS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        // ❌ Pas de getItemLayout → perf dégradée
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 16 },
  list: { flex: 1 },
  userCard: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    marginBottom: 8,
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF3000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '600' },
  userEmail: { fontSize: 13, color: '#666', marginTop: 2 },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e9ecef',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
  roleText: { fontSize: 11, fontWeight: '600', color: '#495057' },
});

export default UserList;
