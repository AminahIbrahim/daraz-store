import { create } from 'zustand';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>, quantityToAdd?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()((set, get) => ({
  cart: [],

  addToCart: (product, quantityToAdd = 1) => {
    const currentCart = get().cart;
    const existingItem = currentCart.find((item) => item.id === product.id);

    const stock = Number(product.stock) || 10;

    if (existingItem) {
      const newQuantity = Math.min(
        existingItem.quantity + quantityToAdd,
        stock
      );
      set({
        cart: currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        ),
      });
    } else {
      set({
        cart: [...currentCart, { ...product, quantity: Math.min(quantityToAdd, stock) }],
      });
    }
  },

  removeFromCart: (id: string) => {
    set({ cart: get().cart.filter((item) => item.id !== id) });
  },

  updateQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeFromCart(id);
      return;
    }
    set({
      cart: get().cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => set({ cart: [] }),

  getTotalItems: () => {
    return get().cart.reduce((total: number, item: CartItem) => {
      const qty = Number(item.quantity) || 1;
      return total + qty;
    }, 0);
  },

  getTotalPrice: () => {
    return get().cart.reduce((total: number, item: CartItem) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 1;
      return total + price * qty;
    }, 0);
  },
}));