import { classNames } from '@repo/shared/lib';
import { Card, Input, Text } from '@repo/shared/ui';
import { memo } from 'react';

import { EmployeeProfile } from '../EmployeeProfile/ui/EmployeeProfile';
import { EmployeeReport } from '../EmployeeReport/EmployeeReport';

import { Employee, EmployeeRating } from '@/entities/Employee';

import cls from './EmployeeInfo.module.scss';

interface EmployeeInfoProps {
  className?: string;
  employee: Employee;
}

export const EmployeeInfo = memo((props: EmployeeInfoProps) => {
  const { className, employee } = props;

  return (
    <section className={classNames(cls.EmployeeInfo, {}, [className])}>
      <EmployeeProfile employee={employee} className={cls.profile} />
      <Card variant="light" padding="16" className={cls.EmployeeLogin}>
        <Text title="Данные для входа" size="s" bold />
        <Text
          text="Электронная почта является логином для входа сотрудника в сервис"
          size="s"
          variant="grey"
          className={cls.text}
        />
        <Input readonly value={employee.email} />
      </Card>
      <EmployeeReport employee={employee} />
      <EmployeeRating rating={employee.rating} />
    </section>
  );
});
