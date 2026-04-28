import React, { useCallback } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import useFeed from '../hooks/useFeed';

export default function FeedScreen() {
  const { posts, isRefreshing, refresh, likePost } = useFeed();

  // ❌ useCallback essaye d'optimiser mais PostCard n'a pas React.memo
  // donc les re-renders ont quand même lieu
  const handleLike = useCallback((postId: string) => {
    likePost(postId);
  }, [likePost]);

  const handlePress = useCallback((postId: string) => {
    console.log('Navigation vers:', postId);
  }, []);

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <PostCard
          post={item}
          onLike={handleLike}
          onPress={handlePress}
        />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<Header posts={posts} />}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#f5f5f5' },
});
