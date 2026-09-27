// GIỜ 2 — Bài tập 2: Lưới sản phẩm nhiều cột (chưa dùng FlatList/numColumns,
// chỉ luyện flexbox thuần) + tích hợp DiscountBadge của Giờ 3.
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";
import { DiscountBadge } from "./DiscountBadge";

// ==== THỬ THÁCH GIỜ 2 ====
// So sánh 2 cách chia lưới — đổi USE_GAP_LAYOUT để chạy thử cả 2:
//  - false: cách "cổ điển" — width tính theo %, justifyContent 'space-between'
//           để tự chừa khoảng trống ở giữa các cột.
//  - true : cách dùng "gap" — đơn giản hơn (không cần space-between), NHƯNG phải
//           tự tính width = (100% - tổng gap) / số cột, vì gap không tự trừ vào %.
const USE_GAP_LAYOUT = false;
const COLUMNS = USE_GAP_LAYOUT ? 3 : 2;
const GAP = 12;
// Lưu ý quan trọng khi phối % với gap: width tính theo % là so với bề rộng
// CONTAINER, còn gap là khoảng trống THỰC tính bằng px cộng thêm vào giữa các
// cột — 2 đại lượng này không tự trừ cho nhau. Muốn chia "đúng tuyệt đối"
// (100% - tổng gap) / số cột thì phải đo bề rộng container thật bằng px (onLayout).
// Ở đây dùng % AN TOÀN, hơi nhỏ hơn 100/số cột, để luôn đủ chỗ cho gap mà không vỡ dòng.
const GAP_ITEM_WIDTH = COLUMNS === 3 ? "30%" : "48%";

export function BookGrid({ books, onPressBook }: { books: Book[]; onPressBook: (id: number) => void }) {
  return (
    <View
      style={[
        styles.grid,
        // Chế độ "gap": chỉ cần gap, KHÔNG cần justifyContent space-between nữa
        // (vì gap đã tự chừa khoảng cách đều, space-between sẽ làm lệch cột cuối).
        USE_GAP_LAYOUT ? { gap: GAP } : { justifyContent: "space-between" },
      ]}
    >
      {books.map((book) => (
        <Pressable
          key={book.id}
          style={[styles.item, { width: USE_GAP_LAYOUT ? GAP_ITEM_WIDTH : "48%" }]}
          onPress={() => onPressBook(book.id)}
        >
          {/* View bọc ảnh cần position:'relative' để làm containing block cho Badge */}
          <View style={styles.coverWrap}>
            <Image source={{ uri: book.cover }} style={styles.cover} />
            <DiscountBadge discountPercent={book.discountPercent} isNew={book.isNew} />
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    paddingTop: 12,
  },

  item: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,

    // tạo cảm giác card
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  coverWrap: {
    position: "relative",
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#EEF2F7",
  },

  cover: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
    color: "#111827",
  },

  price: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: "#4F46E5",
  },
});
