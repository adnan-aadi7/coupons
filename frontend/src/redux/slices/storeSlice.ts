import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api';

export interface Store {
  _id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  baseUrl?: string;
  affiliateUrl?: string;
  cashbackRate: number;
  category?: string;
  rating: number;
  verifiedStore: boolean;
  totalSavingsProvided: number;
}

interface StoreState {
  stores: Store[];
  currentStore: Store | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: StoreState = {
  stores: [],
  currentStore: null,
  loading: false,
  error: null,
  searchQuery: '',
};



// Async Thunks
export const fetchStores = createAsyncThunk(
  'stores/fetchAll',
  async (params: { category?: string; featured?: boolean; search?: string } | undefined, { rejectWithValue }) => {
    try {
      const response = await api.get('/stores', { params });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stores');
    }
  }
);

export const fetchStoreBySlug = createAsyncThunk(
  'stores/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/stores/${slug}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Store not found');
    }
  }
);

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentStore: (state) => {
      state.currentStore = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchStores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Single
      .addCase(fetchStoreBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStore = action.payload;
      })
      .addCase(fetchStoreBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchQuery, clearCurrentStore } = storeSlice.actions;
export default storeSlice.reducer;
