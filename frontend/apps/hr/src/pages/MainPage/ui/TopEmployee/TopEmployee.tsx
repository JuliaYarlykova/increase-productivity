import { classNames } from '@repo/shared/lib';
import { Card, Text } from '@repo/shared/ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getTop } from '../../api/getTop';

import { Employee, EmployeeCard, TopEmployees } from '@/entities/Employee';
import { getRouteEmployee } from '@/shared/const/router';

import cls from './TopEmployee.module.scss';

export const TopEmployee = () => {
  const [lastEmployee, setLastEmployee] = useState<Employee[]>();
  const navigate = useNavigate();
  const { data: Employee } = getTop(null);
  const handleClick = (id: number) => {
    navigate(getRouteEmployee(String(id)));
  };
  const getEmployee = (Employee: TopEmployees[]) => {
    const formattedEmployee = Employee.map((employee) => ({
      ...employee.user,
      ...employee.employee,
    }));
    setLastEmployee(formattedEmployee);
  };
  useEffect(() => {
    if (Employee) getEmployee(Employee);
  }, [Employee]);

  if (!Employee) return null;

  return (
    <Card
      className={classNames(cls.wrapper_common, {}, [cls.block4])}
      variant="light"
    >
      <Text
        text="Топ-3 сотрудника с наибольшей величиной суммарного риска"
        bold
        size="s"
      />
      <hr className={cls.hr} />
      <ul>
        {lastEmployee &&
          lastEmployee.map((employee, key) => (
            <li key={key}>
              <EmployeeCard
                simple
                employee={employee}
                risk={Employee[key].employee_risk}
                onCardClick={handleClick}
              />
            </li>
          ))}
      </ul>
    </Card>
  );
};
