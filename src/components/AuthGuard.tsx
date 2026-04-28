// ❌ Guard legacy : useEffect + navigation.navigate
// Problèmes :
// - Clignotement avant redirection
// - Ne préserve pas les deep links
// - Dans Expo Router : remplacer par useSegments + Redirect (côté layout)
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!isAuthenticated) {
      // ❌ Navigation impérative : ne préserve pas l'URL de destination
      navigation.navigate('Login');
    }
  }, [isAuthenticated, navigation]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
