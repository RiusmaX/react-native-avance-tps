import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

// ❌ PropTypes au lieu de TypeScript
// ❌ Composant classe
// ❌ Logique metier + UI melanges
// ❌ Appels API dans componentDidMount
// ❌ Pas de hooks
// ❌ Pas d'extraction de logique

class UserProfile extends Component {
  // ❌ PropTypes (pas TypeScript)
  static propTypes = {
    userId: PropTypes.string.isRequired,
    onError: PropTypes.func,
  };

  // ❌ any implicite
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
      // ❌ Etat duplique
      posts: [],
      postsLoading: false,
      // ❌ Cache local fait main
      lastFetch: null,
    };
  }

  // ❌ Logique de fetch dans le component
  componentDidMount() {
    this.fetchUserData();
  }

  // ❌ componentDidUpdate pour re-fetch (pas de dependences claires)
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUserData();
    }
  }

  // ❌ setState callback hell
  fetchUserData() {
    this.setState({ loading: true, error: null }, () => {
      fetch('/api/user/' + this.props.userId)
        .then((res) => {
          if (!res.ok) throw new Error('Erreur chargement');
          return res.json();
        })
        .then((data) => {
          this.setState({ user: data, loading: false, lastFetch: Date.now() }, () => {
            // ❌ Appel API imbrique
            this.fetchUserPosts(data.id);
          });
        })
        .catch((err) => {
          this.setState({ error: err.message, loading: false }, () => {
            if (this.props.onError) {
              this.props.onError(err);
            }
          });
        });
    });
  }

  // ❌ Deuxieme methode de fetch separee
  fetchUserPosts(userId) {
    this.setState({ postsLoading: true }, () => {
      fetch('/api/user/' + userId + '/posts')
        .then((res) => res.json())
        .then((data) => {
          this.setState({ posts: data, postsLoading: false });
        })
        .catch(() => {
          this.setState({ postsLoading: false });
        });
    });
  }

  // ❌ Logique metier dans le render (calcul inline)
  formatJoinDate(dateStr) {
    if (!dateStr) return 'Date inconnue';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  render() {
    const { user, loading, error, posts, postsLoading } = this.state;

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF3000" />
          <Text>Chargement du profil...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.error}>Erreur : {error}</Text>
          <TouchableOpacity onPress={() => this.fetchUserData()}>
            <Text style={styles.retry}>Reessayer</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (!user) return null;

    // ❌ Tout est dans le meme render : profil + posts
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
            <Text style={styles.joinDate}>
              Membre depuis {this.formatJoinDate(user.createdAt)}
            </Text>
          </View>
        </View>

        {/* Bio */}
        <Text style={styles.bio}>{user.bio}</Text>

        {/* Posts */}
        <Text style={styles.sectionTitle}>
          Articles ({posts.length})
        </Text>
        {postsLoading ? (
          <ActivityIndicator />
        ) : (
          posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postExcerpt}>{post.excerpt}</Text>
            </View>
          ))
        )}
      </View>
    );
  }
}

// ❌ Pas de theme, couleurs en dur
const styles = StyleSheet.create({
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12, backgroundColor: '#eee' },
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
