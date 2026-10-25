import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

import { PHONES } from './src/data/phones';
import { colors } from './src/theme';
import { SelectPhoneApp } from './src/ex1/SelectPhoneApp';
import { SelectPhoneApi } from './src/ex1/SelectPhoneApi';
import { BottomTabApp } from './src/ex3/BottomTabApp';
import { StackTabApp } from './src/ex4/StackTabApp';
import { DrawerApp } from './src/ex5/DrawerApp';

type Lesson = 0 | 1 | 2 | 3 | 4 | 5;

const lessons: {
  id: Lesson;
  title: string;
  description: string;
}[] = [
  {
    id: 1,
    title: 'Bài 1 — Select Phone',
    description: 'Chọn màu điện thoại và truyền params',
  },
  {
    id: 2,
    title: 'Bài 2 — Select Phone API',
    description: 'Fetch API, loading, error và retry',
  },
  {
    id: 3,
    title: 'Bài 3 — Bottom Tab',
    description: 'Home, Search, Profile',
  },
  {
    id: 4,
    title: 'Bài 4 — Stack + Tab',
    description: 'Chi tiết sản phẩm và yêu thích',
  },
  {
    id: 5,
    title: 'Bài 5 — Drawer',
    description: 'Home, Profile, Settings',
  },
];

export default function App() {
  const [selected, setSelected] = useState<Lesson>(0);

  if (selected === 1) {
    return <SelectPhoneApp phone={PHONES[0]} />;
  }

  if (selected === 2) {
    return <SelectPhoneApi />;
  }

  if (selected === 3) {
    return <BottomTabApp />;
  }

  if (selected === 4) {
    return <StackTabApp />;
  }

  if (selected === 5) {
    return <DrawerApp />;
  }

  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.title}>LAB 06</Text>
        <Text style={s.subtitle}>React Native Navigation</Text>

        <Text style={s.intro}>
          Chọn một bài thực hành để chạy ứng dụng.
        </Text>

        {lessons.map((lesson) => (
          <Pressable
            key={lesson.id}
            style={s.card}
            onPress={() => setSelected(lesson.id)}
          >
            <View style={s.number}>
              <Text style={s.numberText}>{lesson.id}</Text>
            </View>

            <View style={s.cardText}>
              <Text style={s.cardTitle}>{lesson.title}</Text>
              <Text style={s.description}>
                {lesson.description}
              </Text>
            </View>

            <Text style={s.arrow}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F4F5F7' },
  content: { padding: 20, paddingTop: 45, gap: 14 },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.blue,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.text,
  },
  intro: { color: colors.muted, marginVertical: 10 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    elevation: 2,
  },
  number: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E8EBFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: colors.blue,
  },
  cardText: { flex: 1, gap: 5 },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  description: { fontSize: 12, color: colors.muted },
  arrow: { fontSize: 28, color: colors.muted },
});