import { rtkApi } from '@/shared/api/rtkApi';

export interface EmployeeRisk {
  value_name?: string;
  quality_name?: string;
  risk_name: string;
  risk_value: number;
}

const employeeRisksApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEmployeeRisks: build.query<EmployeeRisk[], number>({
      query: (id) => ({
        url: `/all_employee_risks/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const getEmployeeRisks = employeeRisksApi.useGetAllEmployeeRisksQuery;
