import { useCallback } from 'react';

import { WarningCase } from '../WarningModals/WarningModals';

import {
  deleteValue,
  postValue,
  updateValueName,
  Value,
} from '@/entities/Value';

export const useEditValue = (
  value: Value,
  newValue: Value,
  setNewValue: (value: Value) => void,
  existingValues: Value[],
  createToast: (text: string) => void,
  onDelete: () => void,
  setWarningCase: (wcase: WarningCase) => void,
) => {
  const [addValue, { isLoading: isAddingValue }] = postValue();
  const [deleteValueById, { isLoading: isDeletedValue }] = deleteValue();
  const [changeValueName, { isLoading: isUpdatingValue }] = updateValueName();

  const valueToPost = {
    name: newValue.value_name,
    quality1: newValue.qualities[0]?.quality_name,
    quality2: newValue.qualities[1]?.quality_name ?? '',
    quality3: newValue.qualities[2]?.quality_name ?? '',
    quality4: newValue.qualities[3]?.quality_name ?? '',
    quality5: newValue.qualities[4]?.quality_name ?? '',
  };

  const actionsDisabled = isAddingValue || isDeletedValue || isUpdatingValue;

  const equalQualities = useCallback((value1: Value, value2: Value) => {
    if (value1.qualities.length !== value2.qualities.length) return false;
    return value1.qualities.every((item1) =>
      value2.qualities.some((item2) => item1.quality_id === item2.quality_id),
    );
  }, []);

  const equalValues =
    value.value_name === newValue.value_name && equalQualities(newValue, value);

  const disabledQualities = existingValues.some((item) =>
    equalQualities(newValue, item),
  );

  const handleSaveValue = () => {
    if (disabledQualities) {
      setWarningCase('onDisabledQualities');
      return;
    }
    if (!newValue.value_id) {
      addValue(valueToPost)
        .unwrap()
        .then(() => {
          createToast('Ценность сохранена!');
        });
    } else if (equalQualities(newValue, value)) {
      changeValueName({
        id: newValue.value_id,
        ...valueToPost,
      })
        .unwrap()
        .then(() => {
          createToast('Изменения сохранены!');
        });
    } else setWarningCase('onSave');
  };

  const changeQualiies = () => {
    if (newValue.value_id)
      deleteValueById(newValue.value_id)
        .unwrap()
        .then(() => {
          addValue(valueToPost)
            .unwrap()
            .then(() => {
              createToast('Изменения сохранены!');
            });
        });
  };

  const handleDeleteValue = () => {
    if (!newValue.value_id) {
      onDelete();
      createToast('Ценность удалена');
    } else
      deleteValueById(newValue.value_id)
        .unwrap()
        .then(() => {
          createToast('Ценность удалена');
        });
  };

  const checkName = () => {
    if (
      newValue.value_name !== '' &&
      existingValues.some((value) => value.value_name === newValue.value_name)
    ) {
      setWarningCase('onDisabledName');
      setNewValue({ ...newValue, value_name: '' });
    }
  };

  return {
    equalQualities,
    equalValues,
    handleSaveValue,
    handleDeleteValue,
    changeQualiies,
    checkName,
    actionsDisabled,
  };
};
