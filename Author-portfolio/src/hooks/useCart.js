"use client";

import { useSyncExternalStore } from "react";
import {
  EMPTY_CART,
  addItem,
  clearCart,
  getCartSnapshot,
  removeItem,
  setItemQuantity,
  subscribeToCart,
} from "@/lib/cart-store";
import { useIsHydrated } from "@/hooks/useIsHydrated";

/**
 * Shopping cart state. `isReady` turns true after hydration, once the saved
 * cart has been read; use it before redirecting on an empty cart.
 */
export function useCart() {
  const cartItems = useSyncExternalStore(subscribeToCart, getCartSnapshot, () => EMPTY_CART);
  const isReady = useIsHydrated();

  return {
    cartItems,
    isReady,
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    addToCart: addItem,
    removeFromCart: removeItem,
    updateQuantity: setItemQuantity,
    clearCart,
  };
}
