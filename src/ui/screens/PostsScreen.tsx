import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// 🔲 TODO : Importer les hooks TanStack Query
// import { usePosts } from '../../data/hooks/usePosts';
// import { PostCard } from '../components/PostCard';

// 🔲 TODO : Implémenter PostsScreen
// - Utiliser usePosts (useInfiniteQuery) pour charger les posts
// - Afficher la liste avec FlatList + PostCard
// - Gérer les états de chargement et d'erreur
// - Implémenter le scroll infini (onEndReached)
// - Pull-to-refresh (onRefresh)

export default function PostsScreen() {
  // 🔲 TODO : Décommentez et implémentez
  // const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } = usePosts();
  // ...

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      <Text style={styles.todo}>
        🔲 TODO : Implémenter la liste des posts avec FlatList, PostCard, scroll infini et pull-to-refresh
      </Text>
      {/*
      <FlatList
        data={data?.pages.flatMap(p => p.posts) ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        onEndReached={() => hasNextPage && fetchNextPage()}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        ListEmptyComponent={isLoading ? <ActivityIndicator /> : null}
      />
      */}
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
  todo: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 16,
    fontStyle: 'italic',
  },
});
