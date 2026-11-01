# TraLoi.md — Buổi 7: Câu hỏi bổ sung

**1. Cấu trúc điều hướng.** BookDetail nằm ở Stack nên nó phủ lên cả Tab Bar và có sẵn nút ← để quay lại. Nếu đặt trong Tab, nó sẽ thành một tab riêng: Tab Bar vẫn hiện, không có nút quay lại, và phải tìm cách ẩn tab đó khỏi thanh dưới.

**2. Redux.** Redux Toolkit dùng Immer, nên `state.items.push(...)` thực ra sửa trên một bản nháp (draft). Immer so sánh rồi tự tạo ra state mới bất biến, state gốc không bị đụng tới. Bỏ `useMemo` trong `useCart` thì kết quả hiển thị vẫn đúng, chỉ là tổng bị tính lại ở mỗi lần render, giỏ lớn mới thấy chậm. `useMemo` chỉ để tối ưu, không quyết định đúng sai.

**3. Promise.all.** Nếu `getCategories()` lỗi thì `Promise.all` lỗi cả nhóm, Home vào `catch` và hiện ErrorView dù sách đã tải được. Dùng `Promise.allSettled` thì vẫn hiện được danh sách sách, chỉ thiếu chip danh mục. Đổi lại phải tự kiểm tra `status` của từng kết quả và tự xử lý lỗi riêng cho từng phần, code dài hơn và có thêm trạng thái "lỗi một phần".

**4. Debounce.** Nếu đặt `setTimeout` thẳng trong `onChangeText` thì không có gì huỷ timer cũ, nên mỗi phím gõ vẫn gây một lần lọc (chỉ trễ đi chứ không gộp lại). Hàm dọn dẹp `clearTimeout` huỷ timer cũ mỗi khi `value` đổi nên chỉ lần gõ cuối được áp dụng, đồng thời tránh timer chạy `setState` sau khi component đã bị gỡ (unmount).

**5. Code bổ sung — sắp xếp theo giá.** Trong `HomeScreen.tsx`:

```tsx
type SortOrder = "asc" | "desc" | null;
const [sort, setSort] = useState<SortOrder>(null);

const visibleBooks = useMemo(() => {
  const filtered = filterBooks(books, { keyword: debouncedKeyword, categoryId, priceRange });
  if (!sort) return filtered;
  return [...filtered].sort((a, b) => (sort === "asc" ? a.price - b.price : b.price - a.price));
}, [books, debouncedKeyword, categoryId, priceRange, sort]);
```

(Ảnh chụp màn hình đính kèm riêng khi nộp.)

## Thử thách C1
`useWishlist()` ẩn Redux phía sau; giao diện chỉ gọi `isFavorite(id)` và `toggle(id)`. Nếu đổi sang Zustand/Recoil thì chỉ sửa `store/hooks.ts`, các màn hình giữ nguyên.
