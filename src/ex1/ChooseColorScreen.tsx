import React, { useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { ColorKey, Phone } from '../types';
import { COLOR_ORDER, PHONE_COLORS } from '../data/phones';
import { colors, formatPrice } from '../theme';
import type { SelectPhoneParamList } from './SelectPhoneApp';

type Props = NativeStackScreenProps<
  SelectPhoneParamList,
  'ChooseColor'
> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(
    route.params?.color
  );
  const [line1, line2] = phone.name.split(' - ');
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={s.root}>
      <View style={s.header}>
        <View
          style={[
            s.thumb,
            { backgroundColor: PHONE_COLORS[shown].hex },
          ]}
        >
          <Text style={{ fontSize: 42 }}>📱</Text>
        </View>

        <View style={s.headerText}>
          <Text style={s.small}>{line1}</Text>
          <Text style={s.small}>{line2}</Text>

          {picked && (
            <>
              <Text style={s.small}>
                Màu: <Text style={s.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={s.small}>
                Cung cấp bởi{' '}
                <Text style={s.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={s.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={s.body}>
        <Text style={s.hint}>Chọn một màu bên dưới:</Text>

        {COLOR_ORDER.map((key) => (
          <Pressable
            key={key}
            onPress={() => setPicked(key)}
            style={[
              s.swatch,
              { backgroundColor: PHONE_COLORS[key].hex },
              picked === key && s.swatchOn,
            ]}
          >
            <Text style={s.swatchText}>
              {PHONE_COLORS[key].label}
            </Text>
          </Pressable>
        ))}

        <Pressable
          style={s.doneBtn}
          onPress={() =>
            navigation.navigate(
              'Product',
              { color: picked },
              { merge: true }
            )
          }
        >
          <Text style={s.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  header: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    alignItems: 'flex-start',
  },
  thumb: {
    width: 100,
    height: 125,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: { flex: 1, gap: 7 },
  small: { color: colors.text, fontSize: 13 },
  bold: { fontWeight: 'bold' },
  price: { fontSize: 19, fontWeight: 'bold' },
  body: {
    flex: 1.2,
    backgroundColor: colors.grey,
    padding: 20,
    alignItems: 'center',
    gap: 12,
  },
  hint: { alignSelf: 'flex-start', fontSize: 16, marginBottom: 4 },
  swatch: {
    width: 100,
    height: 48,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swatchOn: { borderColor: colors.navy, borderWidth: 4 },
  swatchText: {
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowRadius: 3,
  },
  doneBtn: {
    width: '100%',
    backgroundColor: colors.blue,
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 'auto',
  },
  doneText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});