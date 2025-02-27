import React, { ReactNode } from 'react';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';

import { Mods, classNames } from '../../lib/classNames/classNames';

import { useModal } from '../../lib';

import cls from './Modal.module.scss';
import { Card } from '../Card';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const { isMounted, isClosing, close } = useModal({
    onClose,
    isOpen,
    animationDelay: ANIMATION_DELAY,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay />
        <Card padding="24" className={cls.content}>
          {children}
        </Card>
      </div>
    </Portal>
  );
};
