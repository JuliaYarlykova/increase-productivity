import { WarningCase } from '../../../model/types/warning';

export const modalContent: Record<
  WarningCase,
  {
    title: string;
    text: string;
    onConfirm?: boolean;
    confirmText?: string;
    cancelText?: string;
  }
> = {
  onExit: {
    title: 'Подтвердите действие',
    text: 'Изменения для текущей ценности не сохранятся',
    onConfirm: true,
    confirmText: 'Продолжить переход',
    cancelText: 'Сохранить изменения',
  },
  onMove: {
    title: 'Подтвердите действие',
    text: 'Изменения для текущей ценности не сохранятся',
    onConfirm: true,
    confirmText: 'Продолжить переход',
    cancelText: 'Сохранить изменения',
  },
  qualitiesMax: {
    title: 'Достигнут максимум качеств',
    text: 'К каждой ценности можно добавить не более 5 качеств',
  },
  disabledPreset: {
    title: 'Пресет недоступен',
    text: 'У вас уже есть ценность с таким названием, выберите другой пресет, либо смените название ценности',
  },
};
