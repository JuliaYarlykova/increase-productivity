import { ChartData } from 'chart.js';

import { rtkApi } from '@/shared/api/rtkApi';

export type Data = {
  labels: string[];
  datasets: {
    label: string;
    data: string[];
  }[];
};

type PersonalQualities = {
  title: string;
  labels: string[];
  datasets: {
    label: string;
    data: string[];
  }[];
}[];

const graphicsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchCompanyMetrics: build.query<Data, void>({
      query: () => ({
        url: '/company_metrics_graphics',
        method: 'GET',
      }),
    }),

    fetchCompanyValues: build.query<Data, void>({
      query: () => ({
        url: '/company_values_graphics',
        method: 'GET',
      }),
    }),

    fetchPersonalQualities: build.query<PersonalQualities, string>({
      query: (id) => ({
        url: `/personal_values_qualities_graphics/${id}`,
        method: 'GET',
      }),
      providesTags: ['Values'],
    }),

    fetchPersonalValues: build.query<Data, string>({
      query: (id) => ({
        url: `/personal_values_graphics/${id}`,
        method: 'GET',
      }),
    }),

    fetchPersonalMetrics: build.query<Data, string>({
      query: (id) => ({
        url: `/personal_metrics_graphics/${id}`,
        method: 'GET',
      }),
      providesTags: ['Metrics'],
    }),

    fetchPersonalRisk: build.query<ChartData<'bar'>, string>({
      query: (id) => ({
        url: `/risk_graphics/${id}`,
        method: 'GET',
      }),
    }),

    fetchCompanyRisk: build.query<ChartData<'bar'>, null>({
      query: () => ({
        url: `/company_risk_graphics`,
        method: 'GET',
      }),
    }),
  }),
});

export const getCompanyMetrics = graphicsApi.useFetchCompanyMetricsQuery;
export const getCompanyValues = graphicsApi.useFetchCompanyValuesQuery;
export const getPersonalValues = graphicsApi.useFetchPersonalValuesQuery;
export const getPersonalMetrics = graphicsApi.useFetchPersonalMetricsQuery;
export const getPersonalQualities = graphicsApi.useFetchPersonalQualitiesQuery;
export const getPersonalRisks = graphicsApi.useFetchPersonalRiskQuery;
export const getCompanyRisksValues = graphicsApi.useFetchCompanyRiskQuery;
