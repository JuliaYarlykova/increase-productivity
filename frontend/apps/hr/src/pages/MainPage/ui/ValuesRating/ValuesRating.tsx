import { classNames } from '@repo/shared/lib';
import { Card, ProgressBar, Text } from '@repo/shared/ui';

import { getRating } from '../../api/getRating';

import cls from './ValuesRating.module.scss';

export const ValuesRating = () => {
  const { data: rating } = getRating(null);

  return (
    <Card variant="light" className={classNames(cls.wrapper_common, {}, [])}>
      <Text text="Рейтинг ценностей" bold size="s" />
      <div className={cls.wrap}>
        <span className={cls.stat_text}>{`${rating ? rating * 100 : 0}%`}</span>
        <ProgressBar size={rating ? rating * 100 : 0} disabled={false} />
      </div>
    </Card>
  );
};
