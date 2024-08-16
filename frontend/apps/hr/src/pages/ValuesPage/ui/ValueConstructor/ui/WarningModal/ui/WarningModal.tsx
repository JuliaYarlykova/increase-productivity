import { Button, ModalSuccess } from '@repo/shared/ui';

import { WarningCase } from '../../../model/types/warning';
import { modalContent } from '../model/constants';

interface WarningModalProps {
  warningCase: WarningCase;
  onClose: () => void;
  onConfirm?: () => void;
}

export const WarningModal = (props: WarningModalProps) => {
  const { onClose, onConfirm, warningCase } = props;

  const { title, text } = modalContent[warningCase];
  const buttons = modalContent[warningCase].onConfirm ? (
    <div style={{ display: 'flex', gap: 8 }}>
      <Button variant="secondary" size="s" fullWidth onClick={onClose}>
        {modalContent[warningCase].confirmText}
      </Button>
      <Button variant="primary" size="s" fullWidth onClick={onConfirm}>
        {modalContent[warningCase].cancelText}
      </Button>
    </div>
  ) : (
    <Button variant="primary" size="s" fullWidth onClick={onClose}>
      Понятно, спасибо
    </Button>
  );

  return (
    <ModalSuccess
      variant="constructor"
      isOpen={Boolean(warningCase)}
      onClose={() => {}}
      text={text}
      title={title}
      button={buttons}
    />
  );
};
