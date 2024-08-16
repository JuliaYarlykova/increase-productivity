import { Button, Card, Text } from '@repo/shared/ui';
import { memo, useState } from 'react';

import { OperationEmployeeBar, EmployeeOperation } from '@/entities/Employee';

import cls from './EmployeeOperations.module.scss';

interface EmployeeOperationsProps {
  operations?: EmployeeOperation[];
}

const tempOperationsList: EmployeeOperation[] = [
  {
    id: 1,
    name: 'Сертификат OZON',
    description:
      'Подарочный сертификат Ozon - это прекрасный способ порадовать близких и друзей возможностью выбора подарка по своему вкусу из широкого ассортимента товаров на популярном интернет-маркетплейсе. Сертификат представляет собой уникальный код, который можно использовать для оплаты покупок на Ozon. ',
    status: '-1500',
    date: '14.07.2024',
  },
  {
    id: 2,
    name: 'Сертификат OZON',
    description:
      'Подарочный сертификат Ozon - это прекрасный способ порадовать близких и друзей возможностью выбора подарка по своему вкусу из широкого ассортимента товаров на популярном интернет-маркетплейсе. Сертификат представляет собой уникальный код, который можно использовать для оплаты покупок на Ozon. ',
    status: '-1500',
    date: '14.07.2024',
  },
  {
    id: 3,
    name: 'Изменения баланса от HR',
    description: 'Баланс изменен',
    status: '-1500',
    date: '14.07.2024',
  },
  {
    id: 4,
    name: 'Сертификат OZON',
    description:
      'Подарочный сертификат Ozon - это прекрасный способ порадовать близких и друзей возможностью выбора подарка по своему вкусу из широкого ассортимента товаров на популярном интернет-маркетплейсе. Сертификат представляет собой уникальный код, который можно использовать для оплаты покупок на Ozon. ',
    status: '-1500',
    date: '14.07.2024',
  },
  {
    id: 5,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    status: '+1500',
    date: '14.07.2024',
  },
  {
    id: 6,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    status: '+1500',
    date: '14.07.2024',
  },

  {
    id: 7,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    status: '+1500',
    date: '14.07.2024',
  },

  {
    id: 8,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    status: '+1500',
    date: '14.07.2024',
  },
];

export const EmployeeOperations = memo((props: EmployeeOperationsProps) => {
  const { operations } = props;
  const [maxCount, setMaxCount] = useState(5);
  const [isOpen, setOpen] = useState(false);
  return (
    <Card className={cls.EmployeeOperations} variant="light" padding="16">
      <Text title="История операций" size="s" bold />
      <div className={cls.title}>
        <Text text="Описание" variant="grey" size="s" />
        <Text text="Дата" variant="grey" size="s" />
        <Text text="Статус" variant="grey" size="s" />
      </div>
      {tempOperationsList ? (
        <ul>
          {tempOperationsList.slice(0, maxCount).map((operation, key) => (
            <li key={key}>
              <OperationEmployeeBar operation={operation} />
            </li>
          ))}
        </ul>
      ) : (
        <Text
          size="xs"
          text="На данный момент операции не были совершены"
          className={cls.textEmpty}
        />
      )}
      {tempOperationsList.length > 5 && !isOpen && (
        <Button
          variant="ghost"
          size="s"
          onClick={() => {
            setMaxCount(tempOperationsList.length);
            setOpen(true);
          }}
        >
          Открыть все
        </Button>
      )}
      {isOpen && (
        <Button
          variant="ghost"
          size="s"
          onClick={() => {
            setMaxCount(5);
            setOpen(false);
          }}
        >
          Скрыть
        </Button>
      )}
    </Card>
  );
});
