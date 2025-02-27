import { Avatar, Button, Status, TVariant } from '@repo/shared/ui';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { EventRequest } from '../../model/types/event';

import cls from './RequestCard.module.scss';

const getButton = (status: string) => {
  switch (status) {
    case 'Одобрено':
      return (
        <div className={cls.btn_wrapper}>
          <Button variant="ghost" size="s">
            Отклонить
          </Button>
          <Button variant="secondary" size="s">
            Подтвердить выполнение
          </Button>
        </div>
      );
    case 'Ожидание':
      return (
        <div className={cls.btn_wrapper}>
          <Button variant="ghost" size="s">
            Отклонить
          </Button>
          <Button variant="secondary" size="s">
            Принять
          </Button>
        </div>
      );
    default:
      break;
  }
  return false;
};

interface IRequest {
  request: EventRequest;
}

export const RequestCard = (props: IRequest) => {
  const { request } = props;
  const [isOpen, setOpen] = React.useState(false);

  return (
    <motion.div className={cls.body}>
      <div className={cls.head}>
        <Avatar alt={request.name} size={40} />
        <h3 className={cls.name}>{request.name}</h3>
      </div>
      <p>{request.date}</p>
      <p>{request.format}</p>
      <Status variant={request.tag as TVariant} />
      <p> {request.price} Б</p>

      {getButton(request.tag)}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0, translateY: isOpen ? -14 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className={cls.dropDownBtn}
        onClick={() => setOpen(!isOpen)}
      >
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      </motion.button>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className={cls.description}
            key={request.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <p>{`${request.theme}. ${request.description}`}</p>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};
