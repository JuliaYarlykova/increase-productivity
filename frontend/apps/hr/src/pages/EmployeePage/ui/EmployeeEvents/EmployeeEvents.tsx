import { Button, Card, Text } from '@repo/shared/ui';
import { memo, useState } from 'react';

import { EventEmployeeBar, EmployeeEvent } from '@/entities/Employee';

import cls from './EmployeeEvents.module.scss';

interface EmployeeEventsProps {
  events?: EmployeeEvent[];
}

const tempEventsList: EmployeeEvent[] = [
  {
    id: 1,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    duration: 1500,
    status: 'Закрыто',
    date: '14.07.2024',
  },
  {
    id: 1,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    duration: 1500,
    status: 'Отказано',
    date: '14.07.2024',
  },
  {
    id: 1,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    duration: 1500,
    status: 'Отказано',
    date: '14.07.2024',
  },
  {
    id: 1,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    duration: 1500,
    status: 'Закрыто',
    date: '14.07.2024',
  },
  {
    id: 1,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    duration: 1500,
    status: 'Отказано',
    date: '14.07.2024',
  },
  {
    id: 1,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    duration: 1500,
    status: 'Закрыто',
    date: '14.07.2024',
  },
  {
    id: 1,
    name: 'Мероприятие',
    description:
      'Портрет вместе. Творческие мероприятия по сплочению команды отлично подходят для того,чтобы растопить лед или зарядить команду энергией с помощью игры. На ней вы и ваша команда создадите портреты всех членов группы, а затем получите веселые, заряжающие энергией эмоции.',
    duration: 1500,
    status: 'Закрыто',
    date: '14.07.2024',
  },
];

export const EmployeeEvents = memo((props: EmployeeEventsProps) => {
  const { events } = props;

  const [maxCount, setMaxCount] = useState(5);
  const [isOpen, setOpen] = useState(false);
  return (
    <Card className={cls.EmployeeEvents} variant="light" padding="16">
      <Text title="История мероприятий" size="s" bold />
      <div className={cls.title}>
        <Text text="Название" variant="grey" size="s" />
        <Text text="Дата" variant="grey" size="s" />
        <Text text="Вознаграждение" variant="grey" size="s" />
        <Text text="Статус" variant="grey" size="s" />
      </div>
      {tempEventsList ? (
        <ul>
          {tempEventsList.slice(0, maxCount).map((event, key) => (
            <li className={cls.event} key={key}>
              <EventEmployeeBar event={event} />
            </li>
          ))}
        </ul>
      ) : (
        <Text
          size="xs"
          text="Нет информации о посещении мероприятий"
          className={cls.textEmpty}
        />
      )}
      {tempEventsList.length > 5 && !isOpen && (
        <Button
          variant="ghost"
          size="s"
          onClick={() => {
            setMaxCount(tempEventsList.length);
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
