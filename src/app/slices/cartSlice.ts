import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./productSlices";
import { supabase } from "@/app/utils/supabase/supabaseClient";

interface CartState {
  cart: { id: number; quantity: number; price: number }[];
  favorites: number[];
  isInitialized?: boolean;
}

const initialState: CartState = {
  cart: [],
  favorites: [],
  isInitialized: false,
};

let syncCartDebounceTimer: ReturnType<typeof setTimeout> | null = null;

const mergeCarts = (
  localCart: { id: number; quantity: number; price: number }[],
  serverCart: { id: number; quantity: number; price: number }[]
) => {
  const merged = [...localCart];
  serverCart.forEach((serverItem) => {
    const existing = merged.find((item) => item.id === serverItem.id);
    if (!existing) {
      merged.push(serverItem);
      return;
    }
    existing.quantity = serverItem.quantity;
    if (typeof serverItem.price === "number") {
      existing.price = serverItem.price;
    }
  });
  return merged;
};

export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await new Promise<void>((resolve, reject) => {
        if (syncCartDebounceTimer) clearTimeout(syncCartDebounceTimer);

        syncCartDebounceTimer = setTimeout(async () => {
          try {
            const { error } = await supabase
              .from("cart")
              .upsert({ uid: user.id, products: state.cart.cart }, { onConflict: "uid" });
            if (error) return reject(error);
            resolve();
          } catch (error) {
            reject(error);
          }
        }, 500);
      });

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cart.cart));
      }
    }
  }
);

export const syncCartNow = createAsyncThunk(
  "cart/syncCartNow",
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    if (syncCartDebounceTimer) {
      clearTimeout(syncCartDebounceTimer);
      syncCartDebounceTimer = null;
    }

    const { error } = await supabase
      .from("cart")
      .upsert({ uid: user.id, products: state.cart.cart }, { onConflict: "uid" });

    if (error) throw error;

    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(state.cart.cart));
    }
  }
);

export const syncFavorites = createAsyncThunk(
  "cart/syncFavorites",
  async (_, { getState }) => {
    const state = getState() as { cart: CartState };
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from("favorites").upsert(
        {
          uid: user.id,
          product_ids: state.cart.favorites,
        },
        {
          onConflict: "uid",
        }
      );

      if (error) throw error;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(state.cart.favorites));
    }
  }
);

export const loadCartFromServer = createAsyncThunk(
  "cart/loadCartFromServer",
  async () => {
    const localCart =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("cart") || "[]")
        : [];

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return localCart;

    const { data } = await supabase
      .from("cart")
      .select("products")
      .eq("uid", user.id)
      .single();

    const serverCart = (data?.products || []) as {
      id: number;
      quantity: number;
      price: number;
    }[];

    const merged = mergeCarts(localCart, serverCart);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(merged));
    }
    return merged;
  }
);

export const loadFavoritesFromServer = createAsyncThunk(
  "cart/loadFavoritesFromServer",
  async () => {
    const localFavorites =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem("favorites") || "[]")
        : [];

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return localFavorites;

    const { data } = await supabase
      .from("favorites")
      .select("product_ids")
      .eq("uid", user.id)
      .single();

    const merged = Array.from(
      new Set([...(localFavorites as number[]), ...((data?.product_ids || []) as number[])])
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(merged));
    }
    return merged;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeFromStorage: (state) => {
      if (!state.isInitialized && typeof window !== "undefined") {
        const cart = localStorage.getItem("cart");
        const favorites = localStorage.getItem("favorites");
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
    builder.addCase(loadCartFromServer.fulfilled, (state, action) => {
      state.cart = Array.isArray(action.payload) ? action.payload : state.cart;
    });
    builder.addCase(loadFavoritesFromServer.fulfilled, (state, action) => {
      state.favorites = Array.isArray(action.payload) ? action.payload : state.favorites;
    });
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
