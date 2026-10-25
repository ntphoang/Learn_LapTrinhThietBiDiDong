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
import { formatPrice } from '../theme';

export function ProductsTab({
  navigation,
}: TabProps<'Products'>) {
  return (
    <FlatList
      style={s.list}
      contentContainerStyle={s.content}
      data={PHONES}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={s.row}
          onPress={() =>
            navigation.navigate('ProductDetails', { id: item.id })
          }
        >
          <Text style={s.icon}>📱</Text>

          <View style={{ flex: 1 }}>
            <Text style={s.name}>{item.name.split(' - ')[0]}</Text>
            <Text style={s.price}>{formatPrice(item.price)}</Text>
          </View>

          <Text style={s.arrow}>›</Text>
        </Pressable>
      )}
    />
  );
}

const s = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#F4F5F7' },
  content: { padding: 16, gap: 10 },
  row: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  icon: { fontSize: 34 },
  name: { fontSize: 15, fontWeight: '600', color: '#1F2430' },
  price: { color: '#E53A2F', fontWeight: 'bold', marginTop: 6 },
  arrow: { fontSize: 28, color: '#6B7280' },
});