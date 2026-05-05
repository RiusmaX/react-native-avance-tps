import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import PostsScreen from './src/ui/screens/PostsScreen';

// ✅ Defaults raisonnables pour une app React Native :
//   - staleTime 5 min : évite les refetch inutiles à chaque mount
//   - gcTime 10 min   : garde les pages en cache pour la navigation arrière
//   - retry 2         : tolérance aux erreurs réseau transitoires
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 2,
      refetchOnWindowFocus: false, // pas pertinent en mobile
    },
    mutations: {
      retry: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <PostsScreen />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
});
