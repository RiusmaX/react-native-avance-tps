/**
 * UserProfile — Composant refactorisé
 *
 * ✅ Composant fonctionnel (plus de classe)
 * ✅ TypeScript strict (plus de PropTypes)
 * ✅ Logique métier extraite dans useUserProfile hook
 * ✅ TanStack Query pour les appels API
 * ✅ États loading/error/vide gérés
 */

import React, { useCallback } from 'react';
import {
  View, Text, Image, StyleSheet, ActivityIndicator,
  TouchableOpacity, ScrollView,
} from 'react-native';
import { useUserProfile } from '../hooks/useUserProfile';

interface UserProfileProps {
  userId: string;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { data: user, isLoading, isError, error, refetch, isFetching } = useUserProfile(userId);

  const handleRetry = useCallback(() => { refetch(); }, [refetch]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF3000" />
        <Text style={styles.loadingText}>Chargement du profil…</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Erreur de chargement</Text>
        <Text style={styles.errorMessage}>{error?.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRetry} activeOpacity={0.7}>
          <Text style={styles.retryText}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Utilisateur introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.avatarPlaceholder]}>
            <Text style={styles.avatarInitial}>{user.name.charAt(0).toUpperCase()}</Text>
          </View>
        )}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {user.bio ? <Text style={styles.bio}>{user.bio}</Text> : null}

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{user.posts?.length ?? 0}</Text>
          <Text style={styles.statLabel}>Articles</Text>
        </View>
        {user.joinDate ? (
          <View style={styles.stat}>
            <Text style={styles.statValue}>
              {new Date(user.joinDate).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
            </Text>
            <Text style={styles.statLabel}>Membre depuis</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { padding: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  loadingText: { marginTop: 12, fontSize: 15, color: '#6b7280' },
  errorIcon: { fontSize: 48, marginBottom: 12 },
  errorTitle: { fontSize: 17, fontWeight: '600', color: '#dc2626', marginBottom: 8 },
  errorMessage: { fontSize: 13, color: '#9ca3af', textAlign: 'center', marginBottom: 20 },
  retryButton: { backgroundColor: '#FF3000', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  emptyText: { fontSize: 15, color: '#9ca3af' },
  header: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 16 },
  avatarPlaceholder: { backgroundColor: '#FF3000', justifyContent: 'center', alignItems: 'center' },
  avatarInitial: { fontSize: 40, color: '#fff', fontWeight: '700' },
  name: { fontSize: 24, fontWeight: '700', color: '#1a1a2e', marginBottom: 4 },
  email: { fontSize: 15, color: '#6b7280' },
  bio: { fontSize: 15, color: '#374151', textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  statsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  stat: { alignItems: 'center', paddingHorizontal: 24 },
  statValue: { fontSize: 28, fontWeight: '700', color: '#FF3000' },
  statLabel: { fontSize: 13, color: '#6b7280', marginTop: 4 },
});

export default UserProfile;
