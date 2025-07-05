import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./productSlices";
import { supabase } from "@/app/utils/supabase/supabaseClient";
import { getUserData } from "../auth/getUser";

interface CartState {
  cart: { id: number; quantity: number, price: number }[];
  favorites: number[];
  isInitialized?: boolean;
}

const initialState: CartState = {
  cart: [],
  favorites: [],
  isInitialized: false,
};

// Async Thunks for backend synchronization
export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const user = await getUserData();

    if (user) {
      const productIds = state.cart.cart;
      const { error } = await supabase
        .from("cart")
        .upsert(
          { uid: user.id, products: productIds },
          { onConflict: "uid" }
        );

      if (error) {
        console.error("Error syncing cart with backend:", error);
        throw error;
      }
    }
  }
);

export const syncFavorites = createAsyncThunk(
  "cart/syncFavorites",
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const user = await getUserData();

    if (user) {
      const { data, error } = await supabase.from("favorites").upsert(
        {
          uid: user.id,
          product_ids: state.cart.favorites,
        },
        {
          onConflict: "uid",
        }
      );

      if (error) {
        console.log("Detailed Sync Error:", {
          message: error.message,
          details: error.details,
          code: error.code,
        });
        throw error;
      }
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeFromStorage: (state) => {
      if (!state.isInitialized && typeof window !== "undefined") {
        let cart = localStorage.getItem("cart");
        let favorites = localStorage.getItem("favorites");
        const syncCartFav = async () => {
          const user = await getUserData();
          if(user){
            const { data } = await supabase.from('cart').select('products').eq('uid', user.id).single();
            cart = data?.products || [];
            localStorage.setItem("cart", JSON.stringify(cart));

            const { data: favData } = await supabase.from('favorites').select('product_ids').eq('uid', user.id).single();
            favorites = favData?.product_ids || [];
            localStorage.setItem("favorites", JSON.stringify(favorites));
          }
        }
        syncCartFav();
        state.cart = cart ? JSON.parse(cart) : [];
        state.favorites = favorites ? JSON.parse(favorites) : [];
        state.isInitialized = true;
      }
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ id: product.id, quantity: 1, price: product.price });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.cart = state.cart.filter(
        (item: { id: number; quantity: number, price: number }) => item.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.favorites.indexOf(product.id);

      if (index === -1) {
        state.favorites.push(product.id);
      } else {
        state.favorites.splice(index, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.cart.find(
        (item: { id: number; quantity: number, price: number }) => item.id === productId
      );
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const item = state.cart.find(
        (item: { id: number; quantity: number, price: number }) => item.id === productId
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
  },
  extraReducers: (builder) => {
    // Optional: Add handlers for async thunk pending/fulfilled/rejected states if needed
  },
});

export const {
  initializeFromStorage,
  addToCart,
  removeFromCart,
  addToFavorites,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
