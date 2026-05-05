import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useUserProfile } from '../hooks/useUserProfile';
import { formatJoinDate } from '../utils/format';

export interface UserProfileProps {
  userId: string;
  onError?: (error: Error) => void;
}

/**
 * ✅ Composant fonctionnel pur, focalisé sur l'affichage.
 *
 * Refactor par rapport au legacy :
 *   - Composant classe → fonctionnel + hooks
 *   - PropTypes → interface TypeScript
 *   - Fetch dans componentDidMount → useUserProfile (TanStack Query)
 *   - setState callback hell → state local immutable + isLoading dérivé
 *   - Logique métier (formatJoinDate) → extraite dans utils/format
 *   - Posts de l'utilisateur → délégué à un sous-hook (useUserProfile.posts)
 */
export const UserProfile: React.FC<UserProfileProps> = ({ userId, onError }) => {
  const { user, posts, isLoading, error, refetch } = useUserProfile(userId);

  // ✅ Effet de bord propagation d'erreur — délégué au consumer (onError optionnel)
  React.useEffect(() => {
    if (error && onError) onError(error);
  }, [error, onError]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF3000" />
        <Text>Chargement du profil…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Erreur : {error.message}</Text>
        <TouchableOpacity onPress={refetch} accessibilityRole="button">
          <Text style={styles.retry}>Réessayer</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.joinDate}>
            Membre depuis {formatJoinDate(user.createdAt)}
          </Text>
        </View>
      </View>

      <Text style={styles.bio}>{user.bio}</Text>

      <Text style={styles.sectionTitle}>Articles ({posts.length})</Text>
      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postExcerpt}>{post.excerpt}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
    backgroundColor: '#eee',
  },
  name: { fontSize: 20, fontWeight: '700' },
  email: { fontSize: 14, color: '#666', marginTop: 2 },
  joinDate: { fontSize: 12, color: '#999', marginTop: 2 },
  bio: { fontSize: 14, lineHeight: 20, color: '#333', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  postCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  postTitle: { fontSize: 16, fontWeight: '600' },
  postExcerpt: { fontSize: 13, color: '#666', marginTop: 4 },
  error: { color: '#dc3545', fontSize: 16, marginBottom: 12 },
  retry: { color: '#FF3000', fontSize: 16, fontWeight: '600' },
});

export default UserProfile;
