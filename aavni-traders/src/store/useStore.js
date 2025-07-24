import { create } from "zustand";
import {
  fetchCategories,
  fetchComboPacks,
  fetchProducts,
} from "../services/apiService";

const useStore = create((set) => ({
  // Products state
  products: [],
  featuredProducts: [],
  loadingProducts: false,
  productError: null,

  // Categories state
  categories: [],
  loadingCategories: false,
  categoryError: null,

  // Combo Packs state
  comboPacks: [],
  loadingComboPacks: false,
  comboPackError: null,

  // Cart state
  cartItems: [],
  isCartOpen: false,

  // Actions
  fetchProducts: async () => {
    set({ loadingProducts: true, productError: null });
    try {
      const response = await fetchProducts();
      //   console.log(response);
      set({ products: response.data, loadingProducts: false });
    } catch (error) {
      set({ productError: error.message, loadingProducts: false });
    }
  },

  fetchCategories: async () => {
    set({ loadingCategories: true, categoryError: null });
    try {
      const response = await fetchCategories();
      //   console.log(response);

      set({ categories: response, loadingCategories: false });
    } catch (error) {
      set({ categoryError: error.message, loadingCategories: false });
    }
  },

  fetchComboPacks: async () => {
    set({ loadingComboPacks: true, comboPackError: null });
    try {
      const response = await fetchComboPacks();
      //   console.log(response);

      set({ comboPacks: response.data, loadingComboPacks: false });
    } catch (error) {
      set({ comboPackError: error.message, loadingComboPacks: false });
    }
  },

  // Cart actions
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      ),
    })),

  clearCart: () => set({ cartItems: [] }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));

// Create selectors for computed values
export const useCartTotal = () =>
  useStore((state) =>
    state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  );

export const useItemCount = () =>
  useStore((state) =>
    state.cartItems.reduce((count, item) => count + item.quantity, 0)
  );

export default useStore;
