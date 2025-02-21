import { classNames } from '@repo/shared/lib';
import { AppImage, Button, Status, Text as TextTag } from '@repo/shared/ui';
import { ReactNode } from 'react';

import { Event } from '../..';
import { dataEdit } from '../../model/lib/getDate';

import img from '@/shared/assets/images/event.png';

import cls from './EventCardModal.module.scss';

interface IEventCardModal {
  event: Event;
  onOpen: (arg: boolean) => void;
  buttons: ReactNode;
}

export const EventCardModal = (props: IEventCardModal) => {
  const { event, onOpen, buttons } = props;

  return (
    <>
      <div className={cls.img_wrapper}>
        <AppImage
          src={img}
          alt="event"
          width={480}
          className={classNames(cls.img, {}, [])}
        />
        <Status variant="Ожидание" className={cls.tag} size="s" />
      </div>
      <div className={cls.text_wrapper}>
        <div>
          <TextTag title={event.name} className={cls.title} />
          <TextTag
            size="xs"
            className={cls.text}
            text={
              event.description ? event.description : 'Описание отсутствует'
            }
          />
        </div>
        <div className={cls.wrapper}>
          <div className={cls.wrp}>
            <span className={cls.price}>{`${event.reward?.toString()} Б`}</span>
            <span className={cls.date}>
              Создано: {dataEdit(event.event_date)}
            </span>
          </div>

          {buttons}
        </div>
        <Button
          className={cls.close}
          variant="ghost"
          onClick={() => onOpen(false)}
        >
          <span
            className={classNames('material-symbols-outlined', {}, [
              cls.close_btn,
            ])}
          >
            close
          </span>
        </Button>
      </div>
    </>
  );
};
