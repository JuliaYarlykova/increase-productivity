import { classNames } from '@repo/shared/lib';
import { Card, Text } from '@repo/shared/ui';

import { AddAbsenteismForm } from '@/features/AddAbsenteism';

import cls from './Absenteism.module.scss';

interface AbsenteismProps {
  coefficient: string;
  isLoading: boolean;
  description?: string;
}
export const Absenteism = (props: AbsenteismProps) => {
  const { coefficient, isLoading, description } = props;
  return (
    <Card variant="light" className={classNames(cls.wrapper_common, {}, [])}>
      <div className={cls.text_wrap}>
        <Text text="Абсентеизм" bold size="s" />
        <p className={cls.description}>{description?.slice(8)}</p>
      </div>
      <AddAbsenteismForm isLoading={isLoading} absenteism={coefficient} />
    </Card>
  );
};
