import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:5000/api/auth',
    prepareHeaders: (headers) => {
      // Include credentials if needed (cookies are handled automatically by browser if {credentials: 'include'} is used)
      // For JWT in headers:
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        } catch (err) {}
      },
    }),
    getMe: builder.query({
      query: () => '/me',
      providesTags: ['User'],
    }),
    saveCoupon: builder.mutation({
      query: (couponId) => ({
        url: `/save-coupon/${couponId}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    getHistory: builder.query({
      query: () => '/history',
      providesTags: ['User'],
    }),
    simulateConversion: builder.mutation({
      query: (clickId) => ({
        url: `http://localhost:5000/api/admin/simulate-conversion/${clickId}`,
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),
    logout: builder.mutation({
      query: () => '/logout',
      invalidatesTags: ['User'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('token');
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useSaveCouponMutation,
  useGetHistoryQuery,
  useSimulateConversionMutation,
  useLogoutMutation,
} = authApi;
