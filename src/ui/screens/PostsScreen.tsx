import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { usePosts } from '../../data/hooks/usePosts';
import { PostCard } from '../components/PostCard';
import { Post } from '../../domain/models/Post';

export default function PostsScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
    error,
  } = usePosts();

  // ✅ Stabilité des callbacks → moins de re-renders sur les enfants memoïsés
  const handlePressPost = useCallback((postId: string) => {
    // navigation.navigate('PostDetail', { id: postId })
    console.log('open post', postId);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Post }) => (
      <PostCard post={item} onPress={handlePressPost} />
    ),
    [handlePressPost]
  );

  // ✅ Pull-to-refresh sans bloquer le 1er chargement
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // ✅ Pagination infinie — déclenche fetchNextPage à 50% de fin de liste
  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF3000" />
        <Text style={styles.dim}>Chargement des posts…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Erreur : {error instanceof Error ? error.message : 'inconnue'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Posts {data ? `(${data.total})` : ''}
      </Text>
      <FlatList
        data={data?.items ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.footerLoader} />
          ) : null
        }
        ListEmptyComponent={
          <Text style={styles.dim}>Aucun post à afficher.</Text>
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  list: { paddingBottom: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  dim: { fontSize: 13, color: '#666', marginTop: 8 },
  error: { color: '#dc3545', fontSize: 16 },
  footerLoader: { marginVertical: 16 },
});
