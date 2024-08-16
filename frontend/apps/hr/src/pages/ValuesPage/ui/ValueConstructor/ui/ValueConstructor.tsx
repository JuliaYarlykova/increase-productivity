import { Button, Card, Skeleton } from '@repo/shared/ui';
import { memo, useCallback, useEffect, useState } from 'react';

import { useModalActions } from '../model/useModalActions';

import { WarningModal } from './WarningModal/ui/WarningModal';

import { Value, PresetCard, fetchPresets } from '@/entities/Value';
import { EditValue } from '@/features/EditValue';
import { Page } from '@/widgets/Page';

import cls from './ValueConstructor.module.scss';

interface ValueConstrictorProps {
  values: Value[];
  close: () => void;
}

const ValueConstructor = (props: ValueConstrictorProps) => {
  const { values, close } = props;
  const [presetValue, setPresetValue] = useState<Value | null>(null);
  const [disabledPresets, setDisabledPresets] = useState<string[]>([]);
  const [currentValues, setCurrentValues] = useState<Value[]>(
    values[0].value_name ? values : [{ value_name: '', qualities: [] }],
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isEditingValue, setIsEditingValue] = useState(!values[0].value_name);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setPresetValue(null);
    setCurrentValues([...values]);
    setDisabledPresets([]);
    if (!values[0].value_name)
      setCurrentValues([{ value_name: '', qualities: [] }]);
  }, [values]);

  useEffect(() => {
    if (flag) setCurrentIndex(values.length - 1);
    setFlag(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.length]);

  const { data: presets, isLoading } = fetchPresets('');

  const addNewValue = useCallback(() => {
    if (currentValues.length < 8) {
      const newValues = [...currentValues, { value_name: '', qualities: [] }];
      setCurrentValues(newValues);
      setCurrentIndex(newValues.length - 1);
    }
  }, [currentValues]);

  const { onCancel, onConfirm, warningCase, openWarningModal } =
    useModalActions(
      setCurrentIndex,
      currentIndex,
      setCurrentValues,
      currentValues,
      close,
    );

  const addPreset = (value: Value) => {
    if (values.some((item) => item.value_name === value.value_name)) {
      openWarningModal('disabledPreset');
      setDisabledPresets((prev) => [...prev, value.value_name]);
      return;
    }
    setPresetValue({ ...value });
  };

  const onClose = useCallback(() => {
    if (isEditingValue) openWarningModal('onExit');
    else close();
  }, [close, isEditingValue, openWarningModal]);

  const onMove = useCallback(
    (index: number) => {
      if (isEditingValue) openWarningModal('onMove', index);
      else setCurrentIndex(index);
    },
    [isEditingValue, openWarningModal],
  );

  const onDelete = () => {
    setCurrentValues([...currentValues].slice(0, -1));
    setCurrentIndex(currentIndex - 1);
  };

  if (isLoading)
    return (
      <Page className={cls.ValuesConstructorPage}>
        <Skeleton height="100%" />
        <div className={cls.presets}>
          <Skeleton height="126px" width="100%" />
          <Skeleton height="126px" width="100%" />
          <Skeleton height="126px" width="100%" />
          <Skeleton height="126px" width="100%" />
          <Skeleton height="126px" width="100%" />
        </div>
      </Page>
    );
  if (!values || !presets) return null;
  return (
    <Page className={cls.ValuesConstructorPage}>
      <Card variant="light" className={cls.ValuesConstructor}>
        <div className={cls.values_constructor}>
          <h1>Конструктор ценностей</h1>
          <p className={cls.description}>
            Сформируйте список из ценностей (максимально до 8), наполнив их
            качествами (до 5).
          </p>
          <EditValue
            index={currentIndex}
            value={currentValues[currentIndex]}
            presetValue={presetValue}
            isOnlyValue={currentValues.length === 1}
            onQualitiesMax={() => openWarningModal('qualitiesMax')}
            onDelete={onDelete}
            setIsDisabledNewValue={setIsEditingValue}
            existingValues={[...values].filter(
              (value) =>
                value.value_id !== currentValues[currentIndex].value_id,
            )}
          />
          <div className={cls.buttons}>
            <div className={cls.constructor_buttons}>
              {values.length < 8 ? (
                <Button
                  onClick={addNewValue}
                  addonLeft={
                    <span className="material-symbols-outlined">add</span>
                  }
                  disabled={isEditingValue}
                >
                  Добавить новую ценность
                </Button>
              ) : (
                <Button disabled variant="ghost" size="m">
                  Собран максимум ценностей
                </Button>
              )}
              <Button variant="secondary" onClick={onClose}>
                Выйти
              </Button>
            </div>
            <div className={cls.navigation_buttons}>
              <Button
                variant="secondary"
                addonLeft={
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                }
                disabled={currentIndex === 0}
                onClick={() => onMove(currentIndex - 1)}
              >
                Назад
              </Button>
              <Button
                variant="secondary"
                addonRight={
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                }
                disabled={currentIndex === currentValues.length - 1}
                onClick={() => onMove(currentIndex + 1)}
              >
                Вперед
              </Button>
            </div>
          </div>
        </div>
        <div className={cls.presets}>
          <h2>Готовые пресеты</h2>
          <ul className={cls.presets_list}>
            {presets.map((preset) => (
              <li key={preset.value_name}>
                <PresetCard
                  value={preset}
                  addPreset={() => addPreset(preset)}
                  disabled={disabledPresets.includes(preset.value_name)}
                />
              </li>
            ))}
          </ul>
        </div>
      </Card>
      {warningCase && (
        <WarningModal
          warningCase={warningCase}
          onClose={onCancel}
          onConfirm={onConfirm}
        />
      )}
    </Page>
  );
};

export default memo(ValueConstructor);
