import { Card, ProgressBar, Text } from '@repo/shared/ui';
import { memo } from 'react';

import cls from './EmployeeRating.module.scss';

interface EmployeeRatingProps {
  rating: number | null;
}

export const EmployeeRating = memo((props: EmployeeRatingProps) => {
  const { rating } = props;

  return (
    <Card padding="16" className={cls.EmployeeRating} variant="light">
      <Text title="Рейтинг ценностей" size="s" bold />
      {rating ? (
        <div className={cls.rating}>
          <span className={cls.stat_text}>{`${Math.round(rating * 100)}%`}</span>
          <ProgressBar size={rating * 100} />
        </div>
      ) : (
        <div className={cls.norating} />
      )}
    </Card>
  );
});
