import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { AuthGuard } from '../components/AuthGuard';
import type { HomeScreenProps } from '../navigation/types';

export default function HomeScreen({}: HomeScreenProps) {
  const { user, logout } = useAuth();

  return (
    <AuthGuard>
      <View style={styles.container}>
        <Text style={styles.title}>Accueil</Text>
        {user && (
          <Text style={styles.welcome}>Bienvenue, {user.name}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '700', color: '#021023', marginBottom: 8 },
  welcome: { fontSize: 16, color: '#666', marginBottom: 24 },
  button: { backgroundColor: '#FF3000', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
