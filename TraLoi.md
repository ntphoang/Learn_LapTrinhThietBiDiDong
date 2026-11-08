# Buổi 8 — Trả lời câu hỏi bổ sung

**Họ tên:** Phạm Quốc Khánh · **MSSV:** 23641111

## 1. Cờ ready

Khi mở app, lần render đầu tiên store giỏ hàng còn rỗng (`[]`) vì `usePersistence` chưa đọc xong AsyncStorage (việc đọc là bất đồng bộ). Nếu `useAutoPersist` không kiểm tra `ready`, effect chạy ngay sau lần render đầu và ghi mảng rỗng đè lên giỏ đã lưu. Đến khi `loadJSON` trả về thì dữ liệu cũ đã bị ghi đè, nên giỏ cũ mất. Cờ `ready` chỉ bật sau khi đọc và `hydrateCart` xong, nên lần ghi đầu tiên luôn ghi đúng dữ liệu đã nạp.

## 2. Token giả

Thứ nhất, mật khẩu nằm sẵn trong `db.json` và được tải về rồi so sánh ở phía app, ai xem được API cũng thấy mật khẩu. Thứ hai, token do app tự tạo nên ai cũng làm giả được, server không kiểm tra được token đó là thật hay không. Hệ thống thật để **server** kiểm tra mật khẩu (lưu dạng đã băm như bcrypt) và cấp token có ký, có hạn dùng (ví dụ JWT). Trên điện thoại, token nên lưu bằng **expo-secure-store** (Keychain trên iOS, Keystore trên Android) thay cho AsyncStorage vốn lưu dạng chữ thường.

## 3. Hai effect trong CartItemRow

Nếu xóa effect `setQty(item.quantity)`, state `qty` chỉ lấy giá trị `item.quantity` ở lần render đầu và không bao giờ cập nhật theo store nữa. Số trên nút bị lệch khi store đổi từ chỗ khác: ví dụ đang mở tab Giỏ, sang màn Chi tiết bấm "Thêm vào giỏ" thêm lần nữa (store tăng lên 2 nhưng nút vẫn hiện 1), hoặc khi giỏ được nạp lại từ AsyncStorage lúc mở app.

## 4. Một nguồn state

Nếu mỗi `HeartButton` giữ `useState` riêng thì tim ở lưới và tim ở trang Chi tiết là hai biến độc lập: bấm ♥ ở lưới, mở trang chi tiết vẫn thấy ♡, và màn Yêu thích cũng không biết sách nào đã thả tim. Store wishlist là một nguồn duy nhất: mọi `HeartButton` đều đọc `isFavorite(bookId)` và ghi bằng `toggle(bookId)` trên cùng mảng `ids`, nên bấm ở đâu thì mọi chỗ khác cũng cập nhật theo, và mảng đó được lưu lại bằng `useAutoPersist`.

## 5. Code bổ sung — hiện / ẩn mật khẩu

Trong `LoginScreen.tsx` thêm một state và một nút 👁 đặt đè lên góc phải ô Mật khẩu:

```tsx
const [showPassword, setShowPassword] = useState(false);

<View>
  <FormField label="Mật khẩu" value={password} onChangeText={setPassword}
    error={errors.password} secureTextEntry={!showPassword} style={{ paddingRight: 44 }} />
  <Pressable style={styles.eye} onPress={() => setShowPassword((v) => !v)}
    accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}>
    <Text style={styles.eyeText}>👁</Text>
  </Pressable>
</View>
// styles.eye: { position: "absolute", right: 12, top: 32 }
```

Bấm 👁 thì `showPassword` đổi, `secureTextEntry` đổi theo, mật khẩu hiện ra hoặc ẩn đi. Ảnh kết quả: xem báo cáo.
