import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PHONES } from '../data/phones';
import { colors } from '../theme';

type TabParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<
  keyof TabParamList,
  [
    keyof typeof Ionicons.glyphMap,
    keyof typeof Ionicons.glyphMap,
  ]
> = {
  Home: ['home', 'home-outline'],
  Search: ['search', 'search-outline'],
  Profile: ['person', 'person-outline'],
};

function PhoneRow({ name }: { name: string }) {
  return (
    <View style={s.card}>
      <Text style={s.phoneIcon}>📱</Text>
      <Text style={s.phoneName}>{name}</Text>
    </View>
  );
}

function HomeTab() {
  return (
    <SafeAreaView style={s.page}>
      <Text style={s.heading}>Danh sách điện thoại</Text>

      <FlatList
        data={PHONES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 10 }}
        renderItem={({ item }) => (
          <PhoneRow name={item.name.split(' - ')[0]} />
        )}
      />
    </SafeAreaView>
  );
}

function SearchTab() {
  const [keyword, setKeyword] = useState('');

  const filtered = PHONES.filter((phone) =>
    phone.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <SafeAreaView style={s.page}>
      <Text style={s.heading}>Tìm kiếm sản phẩm</Text>

      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
        autoCapitalize="none"
      />

      {filtered.length === 0 ? (
        <View style={s.empty}>
          <Text>
            Không có kết quả cho “{keyword}”
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          renderItem={({ item }) => (
            <PhoneRow name={item.name.split(' - ')[0]} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function ProfileTab() {
  return (
    <View style={s.profile}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>A</Text>
      </View>

      <Text style={s.profileName}>Nguyễn Trần Phi Hoàng</Text>
      <Text style={s.email}>ntphoang205@gmail.com</Text>
    </View>
  );
}

export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: true,
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ title: 'Trang chủ' }}
        />
        <Tab.Screen
          name="Search"
          component={SearchTab}
          options={{ title: 'Tìm kiếm' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: 'Cá nhân' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  heading: {
    fontSize: 21,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 18,
    color: colors.text,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    gap: 12,
  },
  phoneIcon: { fontSize: 30 },
  phoneName: { flex: 1, color: colors.text, fontSize: 15 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    padding: 13,
    margin: 16,
  },
  empty: { padding: 20, alignItems: 'center' },
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarText: { fontSize: 40, color: '#fff', fontWeight: 'bold' },
  profileName: { fontSize: 23, fontWeight: 'bold', color: colors.text },
  email: { marginTop: 8, color: colors.muted },
});