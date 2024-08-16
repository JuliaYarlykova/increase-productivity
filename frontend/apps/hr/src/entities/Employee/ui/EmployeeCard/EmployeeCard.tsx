import { classNames, Mods } from '@repo/shared/lib';
import { Button, ProgressBar } from '@repo/shared/ui';
import { memo } from 'react';

import { Employee } from '../../model/types/employee';

import cls from './EmployeeCard.module.scss';

export interface EmployeeCardProps {
  employee: Employee;
  onCardClick?: (id: number) => void;
  FireEmployeeComponent?: React.ComponentType<{
    employee: Employee;
    className?: string;
  }>;
  simple?: boolean;
}

export const EmployeeCard = memo((props: EmployeeCardProps) => {
  const {
    employee,
    onCardClick = () => {},
    FireEmployeeComponent,
    simple = false,
  } = props;
  const disabled = employee.status === 'fired';

  let name = `${employee.last_name} ${employee.first_name}`;
  if (employee.middle_name) name += ` ${employee.middle_name}`;

  const mods: Mods = {
    [cls.disabled]: disabled,
  };

  if (simple)
    return (
      <div
        className={classNames(cls.SimpleEmployeeCard, mods, [])}
        onClick={() => onCardClick(employee.id)}
      >
        <h4 className={cls.name}>{name}</h4>
        <p className={cls.employee_position}>{employee.position}</p>
      </div>
    );

  return (
    <div
      className={classNames(cls.EmployeeCard, mods, [])}
      onClick={() => onCardClick(employee.id)}
    >
      <h4 className={cls.employee_name}>{name}</h4>
      <p className={cls.employee_position}>{employee.position}</p>
      {employee.rating && !disabled ? (
        <div className={cls.employee_stat}>
          <span className={cls.stat_text}>{`${Math.round(employee.rating * 100)}%`}</span>
          <ProgressBar size={employee.rating * 100} disabled={disabled} thin />
        </div>
      ) : (
        <span className={classNames(cls.stat_text, {}, [cls.norating])}>
          Данные отсутствуют
        </span>
      )}
      {!disabled && FireEmployeeComponent ? (
        <FireEmployeeComponent
          employee={employee}
          className={classNames(cls.card_button, {}, [cls.fire_button])}
        />
      ) : (
        <Button
          size="xs"
          variant="ghost"
          addonLeft={
            <span className="material-symbols-outlined">person_off</span>
          }
          disabled
        >
          Сотрудник уволен
        </Button>
      )}
    </div>
  );
});
