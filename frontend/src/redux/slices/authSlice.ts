import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  savings?: number;
  history?: any[];
  wallet?: {
    pendingCashback: number;
    availableCashback: number;
    lifetimeSavings: number;
  };
  savedCoupons?: any[];
  favoriteStores?: any[];
  contactPreferences?: any;
  paymentMethods?: any[];
  payoutMethods?: any[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  history: any[];
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  loading: false,
  error: null,
  isAuthenticated: false,
  history: [],
};


// Async Thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token || localStorage.getItem('token');
      
      if (!token) return rejectWithValue('No token found');

      const response = await api.get('/auth/me');
      return response.data.data;
    } catch (error: any) {
      localStorage.removeItem('token');
      return rejectWithValue(error.response?.data?.message || 'Session expired');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData: any, { rejectWithValue }) => {
    try {
      const response = await api.put('/auth/profile', profileData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

export const saveCoupon = createAsyncThunk(
  'auth/saveCoupon',
  async (couponId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token || localStorage.getItem('token');
      const response = await api.post(`/auth/save-coupon/${couponId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to save coupon');
    }
  }
);

export const toggleFavoriteStore = createAsyncThunk(
  'auth/toggleFavoriteStore',
  async (storeId: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`/stores/${storeId}/favorite`);
      return response.data; // { success, isFavorite, message }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle favorite');
    }
  }
);

export const fetchHistory = createAsyncThunk(
  'auth/fetchHistory',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token || localStorage.getItem('token');
      const response = await api.get('/auth/history');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch history');
    }
  }
);

export const simulateConversion = createAsyncThunk(
  'auth/simulateConversion',
  async (clickId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token || localStorage.getItem('token');
      const response = await api.post(`/admin/simulate-conversion/${clickId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Simulation failed');
    }
  }
);

export const requestWithdrawal = createAsyncThunk(
  'auth/requestWithdrawal',
  async (withdrawalData: { amount: number; paypalEmail: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/withdrawal/request', withdrawalData);
      return response.data.data; // { withdrawal, wallet }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Withdrawal request failed');
    }
  }
);

export const addPayoutMethod = createAsyncThunk(
  'auth/addPayoutMethod',
  async (payoutData: any, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/payout-method', payoutData);
      return response.data.data; // The updated payoutMethods array
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add payout method');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Me
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Save Coupon
      .addCase(saveCoupon.fulfilled, (state, action) => {
        if (state.user) {
          state.user.savedCoupons = action.payload.data;
        }
      })
      // Fetch History
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      })
      // Simulate Conversion
      .addCase(simulateConversion.fulfilled, (state, action) => {
        // Refresh history or update specific item
        // For simplicity, we'll just let the component refetch or we can update here if we have the index
      })
      // Add Payout Method
      .addCase(addPayoutMethod.fulfilled, (state, action) => {
        if (state.user) {
          state.user.payoutMethods = action.payload;
        }
      })
      // Request Withdrawal
      .addCase(requestWithdrawal.fulfilled, (state, action) => {
        if (state.user) {
          state.user.wallet = action.payload.wallet;
        }
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
