import { Badge, Card } from '@repo/shared/ui';
import React from 'react';

import { Value } from '../../model/types/value';

import cls from './ValueCard.module.scss';

interface ValueCardProps {
  value: Value;
  index: number;
}

export const ValueCard = (props: ValueCardProps) => {
  const { value, index } = props;

  return (
    <>
      <p className={cls.value_order}>{`Ценность №${index + 1}`}</p>
      <Card variant="light" padding="8" className={cls.ValueCard}>
        <div className={cls.card_content}>
          <h3>{value.value_name}</h3>
          <ul className={cls.values_list}>
            {value.qualities.map((item, index) => (
              <li key={index}>
                <Badge variant="secondary" size="s">
                  {item.quality_name}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </>
  );
};
