import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Post } from "../../domain/models/Post";

interface PostCardProps {
  post: Post;
  onPress?: (postId: string) => void;
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1a1a2e",
    marginBottom: 6,
    lineHeight: 22,
  },
  excerpt: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 19,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {
    fontSize: 12,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  tags: {
    flexDirection: "row",
    gap: 6,
  },
  tag: {
    backgroundColor: "#f3f4f6",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "500",
  },
});
