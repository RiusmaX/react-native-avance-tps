import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetail: { productId: string };
  Login: undefined;
};

export type TabParamList = {
  Home: undefined;
  Products: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProductsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Products'>,
  NativeStackScreenProps<RootStackParamList>
>;
