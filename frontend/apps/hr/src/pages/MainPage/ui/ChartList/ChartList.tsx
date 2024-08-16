import { classNames } from '@repo/shared/lib';
import { Card } from '@repo/shared/ui';
import { memo } from 'react';

import { getMetrics } from '../../api/getAbsenteism';
import { Absenteism } from '../Absenteism/Absenteism';
import { CompanyReport } from '../CompanyReport/CompanyReport';
import { EmployeeTurnover } from '../EmployeeTurnover/EmployeeTurnover';
import { TopEmployee } from '../TopEmployee/TopEmployee';
import { ValuesRating } from '../ValuesRating/ValuesRating';

import {
  CompanyMetricsChart,
  CompanyRiskChart,
  CompanyValuesChart,
} from '@/entities/Diagrams';

import cls from './ChartList.module.scss';

export const ChartList = memo(() => {
  const { data: metrics, isLoading } = getMetrics(null);

  if (!metrics) return null;
  return (
    <section className={cls.ChartList}>
      <div className={cls.list_wrap}>
        <div className={cls.block_wrap}>
          <EmployeeTurnover
            isLoading={isLoading}
            description={metrics?.metric_4.description}
            coefficient={
              metrics?.metric_4.coefficient
                ? Number(metrics?.metric_4.coefficient.split('%')[0])
                : 0
            }
          />
          <CompanyReport />
        </div>
        <div className={cls.block_wrap}>
          <ValuesRating />
          <Absenteism
            isLoading={isLoading}
            coefficient={(
              Number(metrics?.metric_5.coefficient) * 100
            ).toString()}
            description={metrics?.metric_5.description}
          />
        </div>
      </div>
      <TopEmployee />
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
        variant="light"
        className={classNames(cls.diagram_card, {}, [cls.block5])}
      >
        <CompanyMetricsChart />
      </Card>
    </section>
  );
});
