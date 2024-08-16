import { TopEmployees } from '@/entities/Employee';
import { rtkApi } from '@/shared/api/rtkApi';

const topApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getTop: build.query<TopEmployees[], null>({
      query: () => ({
        url: `/top_risks_employees`,
        method: 'GET',
      }),
    }),
  }),
});

export const getTop = topApi.useGetTopQuery;
