import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { HomeScreen } from "./screens/HomeScreen";
import { BookDetailScreen } from "./screens/BookDetailScreen";
import { CartScreen } from "./screens/CartScreen";

import { TabBar, TabKey } from "./components/TabBar";

import { BOOKS, CART_ITEMS } from "./data";

export default function App() {
  // Tab hiện tại
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  // Sách đang được chọn để xem chi tiết
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  // Số lượng sản phẩm trong giỏ
  const [cartCount, setCartCount] = useState(0);

  // Tìm sách đang chọn
  const selectedBook =
    BOOKS.find((book) => book.id === selectedBookId) ?? null;

  // =========================
  // MÀN HÌNH CHI TIẾT SÁCH
  // =========================
  if (selectedBook) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.body}>
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={() => setCartCount((n) => n + 1)}
          />
        </View>

        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  // =========================
  // APP CHÍNH
  // =========================
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>

        {/* ================= HOME ================= */}
        {activeTab === "home" && (
          <HomeScreen
            cartCount={cartCount}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => setActiveTab("cart")}
          />
        )}

        {/* ================ CATEGORY =============== */}
        {activeTab === "category" && (
          <Placeholder tab={activeTab} />
        )}

        {/* ================= CART ================== */}
        {activeTab === "cart" && (
          <CartScreen items={CART_ITEMS} />
        )}

        {/* ================ ACCOUNT ================ */}
        {activeTab === "account" && (
          <Placeholder tab={activeTab} />
        )}

        {/* ================= TAB BAR =============== */}
        <TabBar
          active={activeTab}
          onChange={setActiveTab}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

// ==========================================
// PLACEHOLDER CHO CÁC TAB CHƯA LÀM
// ==========================================

function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: "Trang chủ",
    category: "Nội dung tab Danh mục",
    cart: "Giỏ hàng",
    account: "Nội dung tab Tài khoản",
  };

  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>
        {note[tab]}
      </Text>
    </View>
  );
}

// ==========================================
// STYLE
// ==========================================

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  body: {
    flex: 1,
  },

  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  placeholderText: {
    textAlign: "center",
    color: "#5B6B7F",
    fontSize: 16,
  },
});
