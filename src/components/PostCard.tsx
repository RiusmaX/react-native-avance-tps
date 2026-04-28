import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  author: { name: string; avatar?: string };
  tags: string[];
}

interface PostCardProps {
  post: Post;
  onPress?: (id: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(post.id)}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.excerpt}>{post.excerpt}</Text>
      <View style={styles.footer}>
        <Text style={styles.author}>Par {post.author.name}</Text>
        <View style={styles.tags}>
          {post.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  excerpt: { fontSize: 13, color: '#666', lineHeight: 18, marginBottom: 8 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  author: { fontSize: 12, color: '#999' },
  tags: { flexDirection: 'row', gap: 4 },
  tag: { backgroundColor: '#f0f0f0', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  tagText: { fontSize: 10, color: '#666', fontWeight: '500' },
});
