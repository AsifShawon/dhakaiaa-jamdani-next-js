import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../utils/supabase/supabaseClient';

export interface FilterParams {
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  availability?: string[];
  rating?: number[];
  search?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  discount: number;
  discounted_price: number;
  category: string;
  availability: string;
  image_urls?: string[];
  description?: string;
  detailed_desc?: string;
  rating?: number;
  created_at?: string;
}

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: FilterParams;
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters?: FilterParams) => {
    let query = supabase
      .from('products')
      .select(`
        *,
        discounted_price:price,
        detailed_desc
      `);

    if (filters) {
      // Category filter
      if (filters.category && filters.category.length > 0) {
        query = query.in('category', filters.category);
      }
      
      // Search filter
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,category.ilike.%${filters.search}%`);
      }
      
      // Availability filter
      if (filters.availability && filters.availability.length > 0) {
        query = query.in('availability', filters.availability);
      }

      // Price filter using raw price (we'll filter discounted prices in JS)
      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
    }

    query = query.order('created_at', { ascending: false });

    const { data: products, error } = await query;
    
    if (error) {
      throw new Error(error.message);
    }
    
    // Calculate discounted prices and apply additional filters
    const processedProducts = products
      .map(product => ({
        ...product,
        discounted_price: product.price - ((product.price * product.discount) / 100),
        rating: product.rating || Math.floor(Math.random() * 2) + 4 // Mock rating for demo
      }))
      // Re-filter based on discounted price if price filters are set
      .filter(product => {
        if (!filters) return true;
        
        const price = product.discounted_price;
        if (filters.minPrice !== undefined && price < filters.minPrice) return false;
        if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;
        
        // Rating filter
        if (filters.rating && filters.rating.length > 0) {
          const hasMatchingRating = filters.rating.some(rating => product.rating >= rating);
          if (!hasMatchingRating) return false;
        }
        
        return true;
      })
      .sort((a, b) => a.discounted_price - b.discounted_price);

    return processedProducts;
  }
);

const initialState: ProductsState = {
  products: [],
  status: 'idle',
  error: null,
  filters: {
    category: [],
    minPrice: 0,
    maxPrice: 10000,
    availability: [],
    rating: [],
    search: "",
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error fetching products';
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;

export const selectAllProducts = (state: { products: ProductsState }) => state.products.products;
export const selectProductsStatus = (state: { products: ProductsState }) => state.products.status;
export const selectProductsError = (state: { products: ProductsState }) => state.products.error;
export const selectFilters = (state: { products: ProductsState }) => state.products.filters;

export const selectPriceRange = (state: { products: ProductsState }) => {
  const products = state.products.products;
  if (products.length === 0) return { min: 0, max: 10000 };
  
  return {
    min: Math.min(...products.map(p => p.discounted_price)),
    max: Math.max(...products.map(p => p.discounted_price))
  };
};

export default productsSlice.reducer;