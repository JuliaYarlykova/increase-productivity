import { classNames } from '@repo/shared/lib';
import { Text } from '@repo/shared/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

import { EmployeeOperation } from '../../model/types/employee';

import cls from './OperationEmployeeBar.module.scss';

interface OperationEmployeeBarProps {
  className?: string;
  operation?: EmployeeOperation;
}

export const OperationEmployeeBar = (props: OperationEmployeeBarProps) => {
  const { className, operation } = props;
  const [isOpen, setOpen] = useState(false);

  if (!operation) return null;
  return (
    <motion.div className={cls.bar}>
      <div className={cls.body}>
        <Text size="xs" text={operation.name} />
        <Text size="xs" text={operation.date} />
        <p
          className={classNames(cls.status, {}, [
            operation.status[0] === '+' ? cls.status_green : cls.status_red,
          ])}
        >
          {operation.status.toString()} Б
        </p>
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
            key={operation.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <Text size="xs" text={operation.description} variant="grey" />
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};
