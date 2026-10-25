import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Phone } from '../types';
import { PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import { Stars } from '../components/Stars';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<
  SelectPhoneParamList,
  'Product'
> & { phone: Phone };

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.imageWrap}>
          <View
            style={[
              s.phoneIllustration,
              { backgroundColor: PHONE_COLORS[shown].hex },
            ]}
          >
            <Text style={s.phoneEmoji}>📱</Text>
            <Text style={s.colorLabel}>
              {PHONE_COLORS[shown].label.toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={s.name}>{phone.name}</Text>

        <View style={s.row}>
          <Stars value={phone.rating} />
          <Text style={s.review}>
            (Xem {phone.reviewCount} đánh giá)
          </Text>
        </View>

        <View style={s.row}>
          <Text style={s.price}>{formatPrice(phone.price)}</Text>
          <Text style={s.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <Text style={s.badge}>{phone.badge}</Text>

        <Pressable
          style={s.chooseBtn}
          onPress={() =>
            navigation.navigate('ChooseColor', { color: picked })
          }
        >
          <Text style={s.chooseText}>
            4 MÀU - CHỌN {picked ? 'LOẠI' : 'MÀU'}
          </Text>
          <Text style={s.arrow}>›</Text>
        </Pressable>

        <Text style={s.supplier}>Cung cấp bởi {phone.supplier}</Text>
      </ScrollView>

      <Pressable style={s.buyBtn} onPress={() => {}}>
        <Text style={s.buyText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  content: { paddingBottom: 20 },
  imageWrap: {
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIllustration: {
    width: 170,
    height: 245,
    borderRadius: 28,
    borderWidth: 6,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneEmoji: { fontSize: 100 },
  colorLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  name: { fontSize: 18, fontWeight: '500', color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  review: { color: colors.muted },
  price: { fontSize: 22, fontWeight: 'bold', color: '#000' },
  oldPrice: {
    color: colors.muted,
    textDecorationLine: 'line-through',
  },
  badge: {
    color: colors.red,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 14,
  },
  chooseBtn: {
    marginTop: 20,
    height: 44,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chooseText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  arrow: { position: 'absolute', right: 12, fontSize: 25, top: 5 },
  supplier: { marginTop: 16, color: colors.muted },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 8,
  },
  buyText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});