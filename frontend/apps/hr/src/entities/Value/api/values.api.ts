import { Quality, Value, ValueToPost } from '../model/types/value';

import { rtkApi } from '@/shared/api/rtkApi';

const valuesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllValues: build.query<Value[], string>({
      query: () => ({
        url: '/quality_values',
        method: 'GET',
      }),
      providesTags: ['Values'],
    }),
    getAllQualities: build.query<Quality[], string>({
      query: () => ({
        url: '/qualities',
        method: 'GET',
      }),
      transformResponse: (response: { data: { id: number; name: string }[] }) =>
        response.data.map((item) => ({
          quality_id: item.id,
          quality_name: item.name,
        })),
    }),
    getPresets: build.query<Value[], string>({
      query: () => ({
        url: '/presets',
        method: 'GET',
      }),
    }),
    addValue: build.mutation<Value, ValueToPost>({
      query: (value) => ({
        url: '/values',
        method: 'POST',
        body: value,
      }),
      invalidatesTags: ['Values'],
    }),
    updateValueName: build.mutation<Value, ValueToPost>({
      query: (value) => ({
        url: `/values/${value.id}`,
        method: 'PUT',
        body: value,
      }),
      invalidatesTags: ['Values'],
    }),
    deleteValue: build.mutation<string, number>({
      query: (id) => ({
        url: `/values/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Values'],
    }),
  }),
});

export const fetchValues = valuesApi.useGetAllValuesQuery;
export const fetchQualities = valuesApi.useGetAllQualitiesQuery;
export const fetchPresets = valuesApi.useGetPresetsQuery;
export const postValue = valuesApi.useAddValueMutation;
export const deleteValue = valuesApi.useDeleteValueMutation;
export const updateValueName = valuesApi.useUpdateValueNameMutation;
