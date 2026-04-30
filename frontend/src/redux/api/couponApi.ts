import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axiosInstance from './axiosInstance';
import type { AxiosRequestConfig, AxiosError } from 'axios';

// Custom base query using Axios
const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = 'GET', body, params, headers }) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data: body,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const couponApi = createApi({
  reducerPath: 'couponApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Coupons', 'Search'],
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: (params) => ({
        url: '/coupons',
        method: 'GET',
        params,
      }),
      providesTags: ['Coupons'],
    }),
    searchByBarcode: builder.mutation({
      query: (barcode) => ({
        url: '/search/barcode',
        method: 'POST',
        body: { barcode },
      }),
      invalidatesTags: ['Search'],
    }),
    trackClick: builder.query({
      query: (id) => ({
        url: `/track/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { 
  useGetCouponsQuery, 
  useSearchByBarcodeMutation,
  useLazyTrackClickQuery
} = couponApi;
