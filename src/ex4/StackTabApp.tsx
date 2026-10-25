
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import type { RootStackParamList, TabParamList } from './types';
import { FavoritesProvider } from './FavoritesContext';
import { ProductsTab } from './ProductsTab';
import { FavoritesTab } from './FavoritesTab';
import { ProductDetailsScreen } from './ProductDetailsScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            Products: focused ? 'phone-portrait' : 'phone-portrait-outline',
            Favorites: focused ? 'heart' : 'heart-outline',
          } as const;

          return (
            <Ionicons
              name={icons[route.name]}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Products"
        component={ProductsTab}
        options={{ title: 'Sản phẩm' }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesTab}
        options={{ title: 'Yêu thích' }}
      />
    </Tab.Navigator>
  );
}

export function StackTabApp() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeTabs}
            options={{ title: 'Cửa hàng' }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: 'Chi tiết sản phẩm' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
