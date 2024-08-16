import { classNames } from '@repo/shared/lib';
import { Button, Card, Text } from '@repo/shared/ui';
import { memo, useState } from 'react';

import { Employee, EmployeeList, fetchEmployees } from '@/entities/Employee';
import { AddEmployeeDrawer } from '@/features/AddEmployee';
import { FireEmployee } from '@/features/FireEmployee';
import { Pagination } from '@/features/Pagination';
import { SortEmployees } from '@/features/SortEmployees';
import { PageLoader } from "@/widgets/PageLoader";

import cls from './EmployeesSection.module.scss';

interface EmployeesSectionProps {
  className?: string;
}

export const EmployeesSection = memo((props: EmployeesSectionProps) => {
  const { className } = props;
  const { data: employees, isLoading, isError } = fetchEmployees('');
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [employeesToDraw, setEmployeesToDraw] = useState<Employee[]>([]);
  const [isAddEmployee, setIsAddEmployee] = useState(false);

  if (isLoading) {
    return (
      <div className={cls.EmployeesSection}>
        <PageLoader />
      </div>
    );
  }

  if (!employees || isError) {
    return <Text title="Произошла ошибка при загрузке данных" align="center" />;
  }

  if (!employees || employees.length === 0) {
    return (
      <div className={cls.start_layout}>
        <Card variant="light" padding="16">
          <Text title="Сотрудники" size="s" className={cls.start_title} />
          <Text
            text="Добавь сотрудников и после заполнения раздела «Ценности и Метрики»,
             мы сможем выводить информацию по каждому сотруднику"
          />
          <Button
            size="s"
            onClick={() => setIsAddEmployee(true)}
            className={cls.start_button}
          >
            Добавить сотрудника
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <section className={classNames(cls.EmployeesSection, {}, [className])}>
      <Card variant="light" padding="16" className={cls.employee_control}>
        <SortEmployees employees={employees} onFilter={setFilteredEmployees} />
        <Button
          variant="primary"
          className={cls.control_button}
          onClick={() => setIsAddEmployee(true)}
        >
          Добавить сотрудника
        </Button>
      </Card>
      <Card variant="light" padding="0" className={cls.employees_list}>
        <div className={cls.employees_header}>
          <span>ФИО</span>
          <span>Должность</span>
          <span>Рейтинг ценностей</span>
        </div>
        <EmployeeList
          employees={employeesToDraw}
          FireEmployeeComponent={FireEmployee}
        />
        <Pagination
          list={filteredEmployees}
          interval={15}
          callback={setEmployeesToDraw}
          className={cls.employees_pagination}
        />
      </Card>

      <AddEmployeeDrawer
        isOpen={isAddEmployee}
        onClose={() => setIsAddEmployee(false)}
      />
    </section>
  );
});
