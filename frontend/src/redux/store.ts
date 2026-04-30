import { configureStore } from '@reduxjs/toolkit';
import { couponApi } from './api/couponApi';
import { authApi } from './api/authApi';

export const store = configureStore({
  reducer: {
    [couponApi.reducerPath]: couponApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(couponApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

