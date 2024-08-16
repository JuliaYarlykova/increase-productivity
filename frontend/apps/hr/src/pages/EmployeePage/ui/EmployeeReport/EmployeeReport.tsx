import { classNames } from '@repo/shared/lib';
import { Card } from '@repo/shared/ui';

import { Employee } from '@/entities/Employee';
import { DownloadEmployeeReportButton } from '@/features/DownloadEmployeeReportButton';

import cls from './EmployeeReport.module.scss';

interface CompanyReportProps {
  employee: Employee;
}

export const EmployeeReport = (props: CompanyReportProps) => {
  const { employee } = props;
  return (
    <Card
      variant="light"
      className={classNames(cls.report, {}, [])}
      padding="16"
    >
      <DownloadEmployeeReportButton employee={employee} />
    </Card>
  );
};
