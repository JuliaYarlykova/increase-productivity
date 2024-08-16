import { classNames } from '@repo/shared/lib';
import { Card } from '@repo/shared/ui';
import React, { memo, useState } from 'react';

import metrics from '../../model/data/tempMetrics.json';
import { CompanyValues } from '../CompanyValues/CompanyValues';
import ValueConstructor from '../ValueConstructor/ui/ValueConstructor';

import { fetchValues } from '@/entities/Value';
import { Page } from '@/widgets/Page';
import { PageLoader } from '@/widgets/PageLoader';

import cls from './ValuesPage.module.scss';

interface ValuesPageProps {
  className?: string;
}

const ValuesPage = (props: ValuesPageProps) => {
  const { className } = props;
  const [isConstructorOpen, setIsConstructorOpen] = useState(false);
  const { data: values, isLoading, isError } = fetchValues('');

  if (isLoading) {
    return (
      <div className={cls.EmployeesSection}>
        <PageLoader />
      </div>
    );
  }

  if (!values || isError) {
    return null;
  }

  return (
    <Page className={classNames(cls.ValuesPage, {}, [className])}>
      {isConstructorOpen ? (
        <ValueConstructor
          values={values}
          close={() => setIsConstructorOpen(false)}
        />
      ) : (
        <>
          <CompanyValues
            values={values}
            openConstructor={() => setIsConstructorOpen(true)}
          />
          <Card variant="light" className={cls.company_metrics}>
            <div className={cls.metrics_header}>
              <h2>Метрики</h2>
              <p>
                По метрикам строятся прогнозы о состоянии сотрудников и
                коллектива компании
              </p>
            </div>
            <ul className={cls.metrics_list}>
              {metrics.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
          </Card>
        </>
      )}
    </Page>
  );
};

export default memo(ValuesPage);
