import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import PostsScreen from './src/ui/screens/PostsScreen';

// 🔲 TODO : Configurer staleTime et gcTime
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,       // 🔲 TODO : configurer
      gcTime: 0,          // 🔲 TODO : configurer
      retry: 2,
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
