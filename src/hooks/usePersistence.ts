import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage"; // đã viết sẵn
import { loadJSON } from "../storage/storage"; // đã viết sẵn
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types";

export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

// Mở app → nạp dữ liệu đã lưu; sau đó mọi thay đổi tự ghi lại. App.tsx chỉ hiện màn hình chính khi ready = true.
export function usePersistence() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  useEffect(() => {
    (async () => {
      // BT8.3 + BT8.7b: đọc 3 thứ SONG SONG
      const [auth, cart, wish] = await Promise.all([
        loadAuth(),
        loadJSON<CartItem[]>(CART_KEY),
        loadJSON<number[]>(WISHLIST_KEY),
      ]);
      if (auth?.token && auth.user) dispatch(setCredentials(auth)); // BT8.3: auto-login
      if (cart) dispatch(hydrateCart(cart)); // BT8.7b
      if (wish) dispatch(hydrateWishlist(wish)); // BT8.7b
      setReady(true); // đọc xong mới cho phép ghi
    })();
  }, [dispatch]);

  // BT8.3: đăng nhập → lưu phiên; đăng xuất (user/token về null) → xóa phiên
  useEffect(() => {
    if (!ready) return;
    if (user && token) saveAuth({ user, token });
    else clearAuth();
  }, [ready, user, token]);

  // BT8.7b: giỏ hàng và yêu thích tự ghi mỗi khi đổi
  useAutoPersist(CART_KEY, cartItems, ready);
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready);

  return ready;
}
