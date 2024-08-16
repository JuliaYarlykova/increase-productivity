import { rtkApi } from '@/shared/api/rtkApi';

export interface CompanyRisk {
  value_name?: string;
  quality_name?: string;
  risk_name: string;
  risk_value: number;
}

const companyRisksApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCompanyRisks: build.query<CompanyRisk[], null>({
      query: () => ({
        url: `/all_company_risks`,
        method: 'GET',
      }),
    }),
  }),
});

export const getCompanyRisks = companyRisksApi.useGetAllCompanyRisksQuery;
