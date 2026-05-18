import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import PostCard from '../components/PostCard';
import { usePosts } from '../hooks/usePosts';

export default function PostsScreen() {
  const { posts, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch, isRefetching } = usePosts();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF3000" />
        <Text style={styles.loadingText}>Chargement des articles...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>Erreur de chargement</Text>
        <Text style={styles.errorDetail}>{error?.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Articles</Text>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} />}
        keyExtractor={(item) => item.id}
        onEndReached={() => { if (hasNextPage) fetchNextPage(); }}
        onEndReachedThreshold={0.5}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={styles.loader} /> : null}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 22, fontWeight: '700', padding: 16, paddingBottom: 8, color: '#021023' },
  list: { paddingBottom: 20 },
  loadingText: { marginTop: 12, color: '#666' },
  errorIcon: { fontSize: 40, marginBottom: 8 },
  errorText: { fontSize: 18, fontWeight: '600', color: '#dc3545' },
  errorDetail: { fontSize: 13, color: '#666', marginTop: 4, textAlign: 'center' },
  loader: { paddingVertical: 20 },
});
