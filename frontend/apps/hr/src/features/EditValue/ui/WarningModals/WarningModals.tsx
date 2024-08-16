import { Button, ModalSuccess } from '@repo/shared/ui';

import { Value } from '@/entities/Value';

export type WarningCase =
  | 'onSave'
  | 'onDelete'
  | 'onDisabledName'
  | 'onDisabledQualities';
interface WarningModalsProps {
  warningCase: WarningCase | null;
  setWarningCase: (warningcase: WarningCase | null) => void;
  changeQualiies: () => void;
  handleDeleteValue: () => void;
  setNewValue: (value: Value) => void;
  value: Value;
  divRef: React.RefObject<HTMLDivElement>;
}

export const WarningModals = (props: WarningModalsProps) => {
  const {
    warningCase,
    setWarningCase,
    handleDeleteValue,
    changeQualiies,
    setNewValue,
    value,
    divRef,
  } = props;

  return (
    <>
      <ModalSuccess
        variant="constructor"
        isOpen={warningCase === 'onSave'}
        onClose={() => {}}
        text="Статистика текущих качеств станет недоступна при выборе нового набора качеств "
        title="Подтвердите действие"
        button={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant="secondary"
              size="s"
              fullWidth
              onClick={() => {
                setNewValue({ ...value });
                setWarningCase(null);
              }}
            >
              Отменить изменения
            </Button>
            <Button
              variant="primary"
              size="s"
              fullWidth
              onClick={() => {
                changeQualiies();
                setWarningCase(null);
              }}
            >
              Сохранить изменения
            </Button>
          </div>
        }
      />
      <ModalSuccess
        variant="constructor"
        isOpen={warningCase === 'onDelete'}
        onClose={() => {}}
        text="Ценность будет безвозвратно удалена "
        title="Подтвердите действие"
        button={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant="secondary"
              size="s"
              fullWidth
              onClick={() => {
                setWarningCase(null);
              }}
            >
              Отменить
            </Button>
            <Button
              variant="primary"
              size="s"
              fullWidth
              onClick={() => {
                handleDeleteValue();
                setWarningCase(null);
              }}
            >
              Удалить
            </Button>
          </div>
        }
      />
      <ModalSuccess
        variant="constructor"
        isOpen={warningCase === 'onDisabledName'}
        onClose={() => {}}
        text="У вас уже есть ценность с таким названием, смените название ценности"
        title="Название недоступно"
        button={
          <Button
            variant="primary"
            size="s"
            fullWidth
            onClick={() => {
              divRef.current?.getElementsByTagName('input')[0].focus();
              setWarningCase(null);
            }}
          >
            Понятно, спасибо
          </Button>
        }
      />
      <ModalSuccess
        variant="constructor"
        isOpen={warningCase === 'onDisabledQualities'}
        onClose={() => {}}
        text="Измените состав качеств, он не должен быть на 100% идентичным с качествами другой ценности"
        title="Действие невозможно"
        button={
          <Button
            variant="primary"
            size="s"
            fullWidth
            onClick={() => setWarningCase(null)}
          >
            Понятно, спасибо
          </Button>
        }
      />
    </>
  );
};
