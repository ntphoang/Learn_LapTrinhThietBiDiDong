import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

type DrawerParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  return (
    <SafeAreaView style={s.center}>
      <Text style={s.big}>Xin chào 👋</Text>
      <Text style={s.muted}>
        Chào mừng bạn đến với ứng dụng Lab 06.
      </Text>
    </SafeAreaView>
  );
}

function ProfileScreen() {
  return (
    <SafeAreaView style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>

      <Text style={s.big}>Nguyễn Văn An</Text>
      <Text style={s.muted}>an.nguyen@example.com</Text>
    </SafeAreaView>
  );
}

function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <ScrollView
      style={[
        s.settingsPage,
        { backgroundColor: dark ? '#171717' : '#F4F5F7' },
      ]}
      contentContainerStyle={s.settingsContent}
    >
      <Text
        style={[
          s.settingsTitle,
          { color: dark ? '#fff' : colors.text },
        ]}
      >
        Cài đặt
      </Text>

      <View
        style={[
          s.settingRow,
          { backgroundColor: dark ? '#292929' : '#fff' },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={[
              s.settingLabel,
              { color: dark ? '#fff' : colors.text },
            ]}
          >
            Nhận thông báo
          </Text>
          <Text style={s.muted}>Cho phép nhận thông báo</Text>
        </View>

        <Switch value={notify} onValueChange={setNotify} />
      </View>

      <View
        style={[
          s.settingRow,
          { backgroundColor: dark ? '#292929' : '#fff' },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={[
              s.settingLabel,
              { color: dark ? '#fff' : colors.text },
            ]}
          >
            Giao diện tối
          </Text>
          <Text style={s.muted}>Thay đổi nền màn hình cài đặt</Text>
        </View>

        <Switch value={dark} onValueChange={setDark} />
      </View>

      <Text
        style={[
          s.status,
          { color: dark ? '#fff' : colors.text },
        ]}
      >
        Thông báo: {notify ? 'BẬT' : 'TẮT'} · Giao diện:{' '}
        {dark ? 'tối' : 'sáng'}
      </Text>
    </ScrollView>
  );
}

export function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red,
          drawerInactiveTintColor: colors.text,
          headerTintColor: colors.text,
          drawerLabelStyle: { fontSize: 15 },
          drawerIcon: ({ color, size }) => {
            const iconName = {
              Home: 'home-outline',
              Profile: 'person-outline',
              Settings: 'settings-outline',
            }[route.name] as keyof typeof Ionicons.glyphMap;

            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Trang chủ' }}
        />

        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Hồ sơ' }}
        />

        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: 'Cài đặt' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  big: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  muted: { color: colors.muted, marginTop: 5 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsPage: { flex: 1 },
  settingsContent: { padding: 18, gap: 14 },
  settingsTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingRow: {
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: { fontSize: 16, fontWeight: '600' },
  status: { marginTop: 10, fontSize: 15, fontWeight: '600' },
});