import { classNames } from '@repo/shared/lib';
import { Status, TVariant, Text } from '@repo/shared/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { EmployeeEvent } from '../../model/types/employee';

import cls from './EventEmployeeBar.module.scss';

interface OperationEmployeeBarProps {
  className?: string;
  event?: EmployeeEvent;
}

export const EventEmployeeBar = (props: OperationEmployeeBarProps) => {
  const { className, event } = props;
  const [isOpen, setOpen] = useState(false);

  if (!event) return null;
  return (
    <motion.div className={cls.bar}>
      <div className={cls.body}>
        <Text size="xs" text={event.name} />
        <Text size="xs" text={event.date} />
        <p className={cls.duration}>{event.duration.toString()} Б</p>
        <Status
          variant={event.status as TVariant}
          className={classNames(cls.status, {}, [])}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className={cls.dropDownBtn}
          onClick={() => setOpen(!isOpen)}
        >
          <span
            className={classNames('material-symbols-outlined', {}, [cls.icon])}
          >
            keyboard_arrow_down
          </span>
        </motion.button>
      </div>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className={cls.description}
            key={event.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Text size="xs" text={event.description} variant="grey" />
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};
