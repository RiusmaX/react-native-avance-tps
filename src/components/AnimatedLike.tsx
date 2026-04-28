// ❌ PROBLÈME 3 : Animation sur le JS thread avec Animated.timing
// L'animation s'exécute sur le JS thread et bloque le scroll.
// Devrait utiliser Reanimated 3 (UI thread).
import React, { useRef } from 'react';
import { Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AnimatedLikeProps {
  initialLikes: number;
  onLike: () => void;
}

function AnimatedLike({ initialLikes, onLike }: AnimatedLikeProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const likes = useRef(initialLikes);

  const handlePress = () => {
    // ❌ Animated.timing avec useNativeDriver: false
    // L'animation s'exécute sur le JS thread
    // Pendant le scroll, ça cause du jank
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.5,
        duration: 150,
        useNativeDriver: false, // ❌ JS thread
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false, // ❌ JS thread
        friction: 3,
      }),
    ]).start();

    likes.current += 1;
    onLike();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Animated.View style={[styles.heart, { transform: [{ scale }] }]}>
        <Text style={styles.icon}>❤️</Text>
      </Animated.View>
      <Text style={styles.count}>{likes.current}</Text>
    </TouchableOpacity>
  );
}

export default AnimatedLike;

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 8 },
  heart: { padding: 4 },
  icon: { fontSize: 24 },
  count: { fontSize: 12, color: '#666', marginTop: 2 },
});
