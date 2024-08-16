import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { USER_SECRET_TOKEN } from '@/shared/const/localstorage';

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: __API__,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_SECRET_TOKEN) || '';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Events', 'Metrics', 'Values', 'Absenteism', 'Employees', 'Notes'],
  endpoints: () => ({}),
});
