import { classNames } from "@repo/shared/lib";
import { Text } from '@repo/shared/ui';
import { memo } from 'react';

import { fetchEvents } from '../api/eventApi';

import { EventsList } from '@/entities/Event';
import { type Event } from '@/entities/Event';
import { PageLoader } from "@/widgets/PageLoader";

import cls from './EventsInfiniteList.module.scss';

interface EventsInfiniteListProps {
  className?: string;
  openDrawer: (value: boolean) => void;
  setActiveEvent: (value: Event) => void;
  setIsModalOpen: (value: boolean) => void;
}

export const EventsInfiniteList = memo((props: EventsInfiniteListProps) => {
  const { className, openDrawer, setActiveEvent, setIsModalOpen } = props;
  const { isLoading, isError, data: response } = fetchEvents('');
  if (isLoading) {
    return (
      <div className={cls.card_wrap}>
        <PageLoader />
      </div>
    );
  }

  if (!response || isError) {
    return <Text title="Произошла ошибка при загрузке данных" align="center" />;
  }

  return (
    <EventsList
      className={classNames('', {}, [className])}
      events={response?.data}
      setIsOpen={openDrawer}
      setActiveEvent={setActiveEvent}
      setIsModalOpen={setIsModalOpen}
    />
  );
});
