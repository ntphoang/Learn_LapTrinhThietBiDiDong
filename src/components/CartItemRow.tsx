import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDebounce } from "../hooks/useDebounce";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}

// BT8.6: nút −/+ với STATE CỤC BỘ (đổi số ngay) + debounce 300 ms (chỉ ghi store 1 lần khi dừng bấm)
export function CartItemRow({ item, onChangeQty, onRemove }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const debouncedQty = useDebounce(qty, 300);

  // dừng bấm 300 ms → đẩy số lượng lên store
  useEffect(() => {
    if (debouncedQty !== item.quantity) onChangeQty(item.bookId, debouncedQty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQty]);

  // store đổi từ nơi khác (nạp lại giỏ, thêm từ màn Chi tiết…) → đồng bộ lại số trên nút
  useEffect(() => {
    setQty(item.quantity);
  }, [item.quantity]);

  const canDec = qty > 1;
  const canInc = qty < item.stock; // không vượt tồn kho

  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.qtyRow}>
          <Pressable
            style={[styles.qtyBtn, !canDec && styles.disabled]}
            disabled={!canDec}
            onPress={() => setQty((q) => q - 1)}
            accessibilityLabel="Giảm"
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{qty}</Text>
          <Pressable
            style={[styles.qtyBtn, !canInc && styles.disabled]}
            disabled={!canInc}
            onPress={() => setQty((q) => q + 1)}
            accessibilityLabel="Tăng"
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>
          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>
      </View>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  qtyRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 6 },
  qtyBtn: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: colors.indigo, alignItems: "center", justifyContent: "center" },
  qtyBtnText: { color: colors.indigo, fontSize: 18, fontWeight: "800", lineHeight: 20 },
  disabled: { opacity: 0.3 },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 16, minWidth: 20, textAlign: "center" },
  stock: { color: colors.muted, fontSize: 12 },
  trash: { fontSize: 22 },
});
