import { configureStore } from '@reduxjs/toolkit';
import storesReducer from './slices/storeSlice';
import authReducer from './slices/authSlice';
import couponReducer from './slices/couponSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coupons: couponReducer,
    stores: storesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Useful for complex API objects if needed
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
