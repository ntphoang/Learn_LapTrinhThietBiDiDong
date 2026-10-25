import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { RootProps } from './types';
import { PHONES, PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { Stars } from '../components/Stars';
import { useFavorites } from './FavoritesContext';

export function ProductDetailsScreen({
  route,
}: RootProps<'ProductDetails'>) {
  const { id } = route.params;
  const phone = PHONES.find((item) => item.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return (
      <View style={s.center}>
        <Text>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = has(phone.id);
  const color = PHONE_COLORS[phone.defaultColor];

  return (
    <ScrollView style={s.page} contentContainerStyle={s.content}>
      <View style={[s.image, { backgroundColor: color.hex }]}>
        <Text style={{ fontSize: 100 }}>📱</Text>
      </View>

      <Text style={s.name}>{phone.name}</Text>

      <Stars value={phone.rating} size={22} />

      <Text style={s.price}>{formatPrice(phone.price)}</Text>
      <Text style={s.supplier}>
        Cung cấp bởi: {phone.supplier}
      </Text>
      <Text style={s.muted}>
        {phone.reviewCount} đánh giá
      </Text>

      <Pressable
        style={[s.button, saved && s.savedButton]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={s.buttonText}>
          {saved ? '♥ Đã lưu' : '♡ Lưu vào yêu thích'}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, gap: 14 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: {
    height: 240,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 21, fontWeight: 'bold', color: colors.text },
  price: { fontSize: 24, fontWeight: 'bold', color: colors.red },
  supplier: { fontSize: 15, color: colors.text },
  muted: { color: colors.muted },
  button: {
    backgroundColor: colors.red,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  savedButton: { backgroundColor: '#287D53' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});