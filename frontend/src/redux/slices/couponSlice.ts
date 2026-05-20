import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api';

export interface Coupon {
  _id: string;
  title: string;
  code?: string;
  description?: string;
  discountValue?: string;
  expiryDate?: string;
  retailerName: string;
  retailerLogo?: string;
  affiliateUrl: string;
  category: string;
  isVerified: boolean;
  type: 'COUPON' | 'DEAL' | 'CASHBACK';
  brandLogo?: string;
  bannerImage?: string;
  store?: string;
  storeName?: string;
}

interface CouponState {
  coupons: Coupon[];
  searchResults: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupons: [],
  searchResults: null,
  loading: false,
  error: null,
};


// Async Thunks
export const fetchCoupons = createAsyncThunk(
  'coupons/fetchAll',
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await api.get('/coupons', { params });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch coupons');
    }
  }
);

export const searchByBarcode = createAsyncThunk(
  'coupons/searchBarcode',
  async (barcode: string, { rejectWithValue }) => {
    try {
      const response = await api.post('/search/barcode', { barcode });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Product not found');
    }
  }
);

export const trackClick = createAsyncThunk(
  'coupons/trackClick',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/track/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Tracking failed');
    }
  }
);

const couponSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Barcode Search
      .addCase(searchByBarcode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchByBarcode.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchByBarcode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSearchResults } = couponSlice.actions;
export default couponSlice.reducer;
