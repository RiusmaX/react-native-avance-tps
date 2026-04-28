// ✅ FIX 3 : Animation sur le UI thread avec Reanimated 3
import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';

interface AnimatedLikeProps {
  initialLikes: number;
  onLike: () => void;
}

function AnimatedLike({ initialLikes, onLike }: AnimatedLikeProps) {
  const scale = useSharedValue(1);
  const likes = useRef(initialLikes);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.5, { duration: 150 }, () => {
      scale.value = withSpring(1, { friction: 3 });
    });
    likes.current += 1;
    runOnJS(onLike)();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Animated.View style={[styles.heart, animatedStyle]}>
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
