import { classNames } from '@repo/shared/lib';
import { Card, ProgressBar, Skeleton, Text } from '@repo/shared/ui';

import cls from './EmployeeTurnover.module.scss';

interface EmployeeTurnoverProps {
  className?: string;
  isLoading?: boolean;
  coefficient: number;
  description?: string;
}

export const EmployeeTurnover = (props: EmployeeTurnoverProps) => {
  const { className, coefficient, isLoading, description } = props;

  if (isLoading) return <Skeleton width={404} height={175} />;
  return (
    <Card variant="light" className={classNames(cls.wrapper_common, {}, [])}>
      <Text text="Текучесть кадров, год" bold size="s" />
      <div className={cls.bar_wrap}>
        <span className={cls.stat_text}>{`${coefficient}%`}</span>
        <ProgressBar size={coefficient} disabled={false} />
        <p className={cls.description}>{description?.slice(7)}</p>
      </div>
    </Card>
  );
};
