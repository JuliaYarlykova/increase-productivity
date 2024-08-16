import { useCallback, useState } from 'react';

import { WarningCase } from './types/warning';

import { Value } from '@/entities/Value';

type Warning = {
  warningCase: WarningCase;
  index?: number;
};

export const useModalActions = (
  setCurrentIndex: (index: number) => void,
  currentIndex: number,
  setCurrentValues: (values: Value[]) => void,
  currentValues: Value[],
  closeConstructor: () => void,
) => {
  const [currentWarning, setCurrentWarning] = useState<Warning | null>(null);

  const openWarningModal = useCallback(
    (warningCase: WarningCase, index?: number) => {
      setCurrentWarning({ warningCase, index });
    },
    [],
  );

  const modalActions: Record<
    WarningCase,
    {
      onConfirm?: () => void;
      onCancel: () => void;
    }
  > = {
    onExit: {
      onConfirm: () => {
        setCurrentWarning(null);
      },
      onCancel: () => {
        setCurrentWarning(null);
        closeConstructor();
      },
    },
    onMove: {
      onConfirm: () => {
        setCurrentWarning(null);
      },
      onCancel: () => {
        if (currentWarning?.index || currentWarning?.index === 0) {
          if (
            currentIndex > currentWarning.index &&
            !currentValues[currentIndex].value_id
          ) {
            setCurrentValues([...currentValues].slice(0, -1));
          }
          setCurrentIndex(currentWarning.index);
        }
        setCurrentWarning(null);
      },
    },
    disabledPreset: {
      onCancel: () => {
        setCurrentWarning(null);
      },
    },
    qualitiesMax: {
      onCancel: () => {
        setCurrentWarning(null);
      },
    },
  };
  if (currentWarning) {
    return {
      onCancel: modalActions[currentWarning?.warningCase].onCancel,
      onConfirm: modalActions[currentWarning.warningCase].onConfirm,
      warningCase: currentWarning.warningCase,
      openWarningModal,
    };
  }
  return {
    openWarningModal,
  };
};
