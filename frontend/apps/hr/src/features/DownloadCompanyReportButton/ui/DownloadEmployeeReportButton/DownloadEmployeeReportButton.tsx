import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@repo/shared/ui';

import { EmployeeRisk, getEmployeeRisks } from '../../api/getEmployeeRisks';
import { EmployeeReport } from '../EmployeeReport/EmployeeReport';

import { getPersonalMetrics, getPersonalValues } from '@/entities/Diagrams';
import type { Employee } from '@/entities/Employee';

interface DownloadEmployeeReportButtonProps {
  employee: Employee;
}

export function DownloadEmployeeReportButton({
  employee,
}: DownloadEmployeeReportButtonProps) {
  const { data } = getEmployeeRisks(employee.id);
  const { data: values } = getPersonalValues(employee.id.toString());
  const { data: metrics } = getPersonalMetrics(employee.id.toString());

  const setData = (data: EmployeeRisk[]) => {
    const uniq = new Set(data.map((e) => JSON.stringify(e)));

    const res = Array.from(uniq).map((e) => JSON.parse(e));
    return res;
  };

  if (!data || !values || !metrics) return null;
  return (
    <PDFDownloadLink
      document={
        <EmployeeReport
          employee={employee}
          data={setData(data)}
          values={values}
          metrics={metrics}
        />
      }
      fileName="Отчёт"
    >
      {({ loading }) => (
        <Button
          fullWidth
          disabled={loading}
          size="m"
          addonRight={
            <span className="material-symbols-outlined">download</span>
          }
        >
          Сформировать отчёт
        </Button>
      )}
    </PDFDownloadLink>
  );
}
