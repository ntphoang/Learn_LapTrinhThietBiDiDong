import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../theme';

export function Loading() {
  return (
    <View style={s.center}>
      <ActivityIndicator size="large" color={colors.blue} />
      <Text style={s.text}>Đang tải...</Text>
    </View>
  );
}

export function ErrorBox({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <View style={s.center}>
      <Text style={s.error}>Đã xảy ra lỗi</Text>
      <Text style={s.text}>{message}</Text>
      <Pressable style={s.button} onPress={onRetry}>
        <Text style={s.buttonText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
    gap: 12,
  },
  text: { color: colors.text, textAlign: 'center' },
  error: { color: colors.red, fontSize: 20, fontWeight: 'bold' },
  button: {
    backgroundColor: colors.blue,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});