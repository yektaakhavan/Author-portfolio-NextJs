// A tiny external store that keeps the shopping cart in localStorage.
// Components subscribe through useSyncExternalStore (see hooks/useCart), which
// renders an empty cart on the server and switches to the saved one after hydration.

const STORAGE_KEY = "cart-items";
export const EMPTY_CART = [];

const listeners = new Set();

// useSyncExternalStore needs a stable reference between changes,
// so the parsed cart is cached against the raw string it came from.
let cachedRaw = null;
let cachedItems = EMPTY_CART;

function readRaw() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage unavailable (e.g. private mode)
  }
}

function parse(raw) {
  try {
    return raw ? JSON.parse(raw) : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

export function getCartSnapshot() {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedItems = parse(raw);
  }
  return cachedItems;
}

export function subscribeToCart(listener) {
  listeners.add(listener);
  // Keeps several open tabs in sync.
  const onStorage = (event) => event.key === STORAGE_KEY && listener();
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function save(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore quota/private-mode errors; the cart simply won't persist.
  }
  listeners.forEach((listener) => listener());
}

export function addItem(product, quantity = 1) {
  const items = getCartSnapshot();
  const exists = items.some((item) => item.id === product.id);

  save(
    exists
      ? items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      : [...items, { ...product, quantity }],
  );
}

export function removeItem(id) {
  save(getCartSnapshot().filter((item) => item.id !== id));
}

export function setItemQuantity(id, quantity) {
  if (quantity < 1) return removeItem(id);
  save(getCartSnapshot().map((item) => (item.id === id ? { ...item, quantity } : item)));
}

export function clearCart() {
  save(EMPTY_CART);
}
