import { classNames } from '@repo/shared/lib';
import { Button, Card } from '@repo/shared/ui';

import { Value, ValueCard } from '@/entities/Value';

import cls from './CompanyValues.module.scss';

interface CompanyValuesProps {
  values?: Value[];
  openConstructor: () => void;
}

export const CompanyValues = (props: CompanyValuesProps) => {
  const { values, openConstructor } = props;

  return (
    <Card variant="light" padding="16" className={cls.company_values}>
      {!values || values.length === 0 || values[0].value_name === undefined ? (
        <section>
          <div className={cls.values_header}>
            <h2>Наши ценности и качества</h2>
            <p>
              Ценности и качества для вашей компании пока не выбраны,
              воспользуйтесь конструктором.
            </p>
          </div>
          <Button size="s" onClick={openConstructor}>
            Открыть конструктор ценностей
          </Button>
        </section>
      ) : (
        <section className={cls.with_values}>
          <div
            className={classNames(cls.values_header, {}, [cls.filled_header])}
          >
            <h2>Ценности и качества</h2>
            <Button size="s" onClick={openConstructor}>
              Открыть конструктор ценностей
            </Button>
          </div>
          <Card padding="16" className={cls.value_list_wrapper}>
            <ul className={cls.value_list}>
              {values.map((value, index) => (
                <li key={index}>
                  <ValueCard value={value} index={index} />
                </li>
              ))}
            </ul>
          </Card>
        </section>
      )}
    </Card>
  );
};
