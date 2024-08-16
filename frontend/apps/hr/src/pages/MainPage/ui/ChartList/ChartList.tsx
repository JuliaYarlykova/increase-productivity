import { classNames } from '@repo/shared/lib';
import { Card, ProgressBar, Text } from '@repo/shared/ui';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAbsenteism } from '../../api/getAbsenteism';
import { getRating } from '../../api/getRating';

import {
  CompanyMetricsChart,
  CompanyRiskChart,
  CompanyValuesChart,
} from '@/entities/Diagrams';
import { Employee, EmployeeCard } from '@/entities/Employee';
import { AddAbsenteismForm } from '@/features/AddAbsenteism';
import { DownloadCompanyReportButton } from '@/features/DownloadCompanyReportButton';
import { getRouteEmployee } from '@/shared/const/router';

import cls from './ChartList.module.scss';

const Employees: Employee[] = [
  {
    id: 1,
    first_name: 'Петров',
    middle_name: 'Пётр',
    last_name: 'Иванович',
    email: 'sdsd',
    company_id: 2,
    imgSrc: '',
    salary: '100',
    birth_date: '',
    position: 'UX/UI дизайнер',
    status: '',
    date_of_hiring: '',
    work_experience: 20,
    balance: '',
    rating: 0.1,
  },
  {
    id: 3,
    first_name: 'Петров',
    middle_name: 'Пётр',
    last_name: 'Иванович',
    email: 'sdsd',
    company_id: 2,
    imgSrc: '',
    salary: '100',
    birth_date: '',
    position: 'UX/UI дизайнер',
    status: '',
    date_of_hiring: '',
    work_experience: 20,
    balance: '',
    rating: 0.1,
  },
  {
    id: 2,
    first_name: 'Петров',
    middle_name: 'Пётр',
    last_name: 'Иванович',
    email: 'sdsd',
    company_id: 2,
    imgSrc: '',
    salary: '100',
    birth_date: '',
    position: 'UX/UI дизайнер',
    status: '',
    date_of_hiring: '',
    work_experience: 20,
    balance: '',
    rating: 0.1,
  },
];

export const ChartList = memo(() => {
  const navigate = useNavigate();
  const { data: absenteism, isLoading } = getAbsenteism(null);
  const { data: rating } = getRating(null);

  const handleClick = (id: number) => {
    navigate(getRouteEmployee(String(id)));
  };

  if (!absenteism && !rating) return null;

  return (
    <section className={cls.ChartList}>
      <div className={cls.list_wrap}>
        <div className={cls.block_wrap}>
          <Card
            variant="light"
            className={classNames(cls.wrapper_common, {}, [])}
          >
            <Text text="Текучесть кадров, год" bold size="s" />
            <div className={cls.bar_wrap}>
              <span className={cls.stat_text}>{`${5}%`}</span>
              <ProgressBar size={5} disabled={false} />
              <p className={cls.description}>
                Метрика в норме, продолжайте её отслеживать, чтобы
                контролировать состояние компании
              </p>
            </div>
          </Card>
          <Card
            variant="light"
            className={classNames(cls.wrapper_common, {}, [])}
          >
            <Text
              text="Отчёт по компании"
              bold
              size="s"
              className={cls.title}
            />
            <Text
              text="Вся страница будет в формате PDF будет выгружена на ваш компьютер"
              size="xs"
              variant="grey"
              className={cls.text}
            />

            <DownloadCompanyReportButton />
          </Card>
        </div>
        <div className={cls.block_wrap}>
          <Card
            variant="light"
            className={classNames(cls.wrapper_common, {}, [])}
          >
            <Text text="Рейтинг ценностей" bold size="s" />
            <div className={cls.wrap}>
              <span
                className={cls.stat_text}
              >{`${rating ? rating * 100 : 0}%`}</span>
              <ProgressBar size={rating ? rating * 100 : 0} disabled={false} />
            </div>
          </Card>
          <Card
            variant="light"
            className={classNames(cls.wrapper_common, {}, [])}
          >
            <Text text="Абсентеизм" bold size="s" />
            <p className={cls.description}>
              {absenteism?.metric_5.description}
            </p>
            <AddAbsenteismForm
              isLoading={isLoading}
              absenteism={(
                Number(absenteism?.metric_5.coefficient) * 100
              ).toString()}
            />
          </Card>
        </div>
      </div>
      <Card
        variant="light"
        className={classNames(cls.diagram_card, {}, [cls.block2])}
      >
        <CompanyRiskChart />
      </Card>
      <Card
        variant="light"
        className={classNames(cls.diagram_card, {}, [cls.block3])}
      >
        <CompanyValuesChart />
      </Card>
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
          {Employees.map((employee, key) => (
            <li key={key}>
              <EmployeeCard
                simple
                employee={employee}
                onCardClick={handleClick}
              />
            </li>
          ))}
        </ul>
      </Card>
      <Card
        variant="light"
        className={classNames(cls.diagram_card, {}, [cls.block5])}
      >
        <CompanyMetricsChart />
      </Card>
    </section>
  );
});
