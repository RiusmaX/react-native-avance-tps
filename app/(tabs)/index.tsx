import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Accueil</Text>
        {user && <Text style={styles.welcome}>Bienvenue, {user.name}</Text>}
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Navigation avec Expo Router</Text>
        <Text style={styles.description}>
          Cette application a été migrée depuis React Navigation vers Expo Router.
          Le routage est maintenant basé sur le système de fichiers.
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  header: { marginTop: 60, marginBottom: 40 },
  title: { fontSize: 32, fontWeight: '700', color: '#1a1a2e', marginBottom: 8 },
  welcome: { fontSize: 16, color: '#6b7280' },
  content: { flex: 1 },
  subtitle: { fontSize: 20, fontWeight: '600', color: '#374151', marginBottom: 12 },
  description: { fontSize: 15, color: '#6b7280', lineHeight: 22 },
  logoutButton: { backgroundColor: '#FF3000', padding: 16, borderRadius: 12, alignItems: 'center' },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
