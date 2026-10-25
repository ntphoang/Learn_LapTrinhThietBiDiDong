import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { TabProps } from './types';
import { PHONES } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { useFavorites } from './FavoritesContext';

export function FavoritesTab({
  navigation,
}: TabProps<'Favorites'>) {
  const { ids } = useFavorites();
  const favorites = PHONES.filter((phone) => ids.includes(phone.id));

  if (favorites.length === 0) {
    return (
      <View style={s.empty}>
        <Text>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={s.list}
      contentContainerStyle={s.content}
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={s.row}
          onPress={() =>
            navigation.navigate('ProductDetails', { id: item.id })
          }
        >
          <Text style={{ fontSize: 32 }}>❤️</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.name}>{item.name.split(' - ')[0]}</Text>
            <Text style={s.price}>{formatPrice(item.price)}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

const s = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#F4F5F7' },
  content: { padding: 16, gap: 10 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
  },
  name: { color: colors.text, fontWeight: '600' },
  price: { color: colors.red, marginTop: 5, fontWeight: 'bold' },
});