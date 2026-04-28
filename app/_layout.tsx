import React from 'react';
import { Stack, Redirect, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  const isAuthScreen = segments[0] === 'login';

  if (typeof isAuthenticated !== 'boolean') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF3000" />
      </View>
    );
  }

  if (!isAuthenticated && !isAuthScreen) {
    return <Redirect href="/login" />;
  }

  if (isAuthenticated && isAuthScreen) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="product/[id]"
        options={{ title: 'Détail produit' }}
      />
      <Stack.Screen
        name="login"
        options={{ presentation: 'modal', title: 'Connexion' }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
