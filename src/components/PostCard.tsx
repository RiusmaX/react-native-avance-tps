// ✅ FIX 1 : React.memo + useCallback + interface TypeScript
import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  thumbnailUrl: string;
  likes: number;
  author: { name: string; avatar: string };
}

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onPress: (id: string) => void;
}

function PostCard({ post, onLike, onPress }: PostCardProps) {
  const handleLike = useCallback(() => {
    console.log('Like:', post.id);
    onLike(post.id);
  }, [post.id, onLike]);

  const handlePress = useCallback(() => {
    onPress(post.id);
  }, [post.id, onPress]);

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: post.thumbnailUrl }} style={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.excerpt}>{post.excerpt}</Text>
        <View style={styles.footer}>
          <View style={styles.author}>
            <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
            <Text style={styles.authorName}>{post.author.name}</Text>
          </View>
          <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
            <Text style={styles.likeIcon}>❤️</Text>
            <Text style={styles.likeCount}>{post.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(PostCard);

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 16, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  thumbnail: { width: '100%', height: 180, backgroundColor: '#eee' },
  content: { padding: 12 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  excerpt: { fontSize: 14, color: '#666', lineHeight: 20 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  author: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 28, height: 28, borderRadius: 14, marginRight: 8, backgroundColor: '#eee' },
  authorName: { fontSize: 13, color: '#333', fontWeight: '500' },
  likeButton: { flexDirection: 'row', alignItems: 'center' },
  likeIcon: { fontSize: 16, marginRight: 4 },
  likeCount: { fontSize: 13, color: '#666' },
});
