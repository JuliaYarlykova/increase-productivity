import { classNames, Mods } from '@repo/shared/lib';
import { Button, Card, Input, Skeleton, Tag, Toast } from '@repo/shared/ui';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useToaster } from 'rsuite';

import { QualitiesBank } from '../QualitiesBank/QualitiesBank';
import { WarningCase, WarningModals } from '../WarningModals/WarningModals';
import { useEditValue } from '../model/useEditValue';

import { Quality, Value, fetchQualities } from '@/entities/Value';

import cls from './EditValue.module.scss';

interface EditValueProps {
  value: Value;
  index: number;
  onQualitiesMax: () => void;
  onDelete: () => void;
  isOnlyValue: boolean;
  setIsDisabledNewValue: (isEditing: boolean) => void;
  presetValue: Value | null;
  existingValues: Value[];
}

export const EditValue = (props: EditValueProps) => {
  const {
    value,
    index,
    onQualitiesMax,
    isOnlyValue,
    onDelete,
    setIsDisabledNewValue,
    presetValue,
    existingValues,
  } = props;

  const { data: allQualities, isLoading, isError } = fetchQualities('');

  const [drag, setDrag] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<Value>(value);
  const [warningCase, setWarningCase] = useState<WarningCase | null>(null);

  const toaster = useToaster();
  const createToast = useCallback(
    (text: string) => {
      toaster.push(
        <Toast
          text={text}
          size="l"
          variant="success"
          addOnLeft={
            <span className="material-symbols-outlined">check_circle</span>
          }
        />,
        { placement: 'bottomCenter' },
      );
    },
    [toaster],
  );

  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setNewValue({ ...value });
  }, [value]);

  useEffect(() => {
    if (presetValue) setNewValue({ ...presetValue });
  }, [presetValue]);

  const {
    equalValues,
    handleSaveValue,
    handleDeleteValue,
    changeQualiies,
    checkName,
    actionsDisabled,
  } = useEditValue(
    value,
    newValue,
    setNewValue,
    existingValues,
    createToast,
    onDelete,
    setWarningCase,
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(false);
    event.dataTransfer.dropEffect = 'move';
    if (newValue.qualities.length < 5) {
      const qualityData = event.dataTransfer.getData('text/plain');
      const droppedQuality = JSON.parse(qualityData) as Quality;
      const newQualities = [...newValue.qualities, droppedQuality];
      setNewValue({ ...newValue, qualities: newQualities });
    } else onQualitiesMax();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(false);
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(true);
  };

  const deleteQuality = (quality: Quality) => {
    const newQualities = newValue.qualities.filter(
      (item) => item.quality_name !== quality.quality_name,
    );
    setNewValue({ ...newValue, qualities: newQualities });
  };

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue({ ...newValue, value_name: event.target.value });
  };

  useEffect(() => {
    setIsDisabledNewValue(
      !equalValues ||
        newValue.value_name === '' ||
        newValue.qualities.length === 0,
    );
  }, [equalValues, newValue, setIsDisabledNewValue]);

  const dropZoneMods: Mods = {
    [cls.empty]: newValue.qualities.length === 0,
    [cls.drag]: drag,
  };

  if (isLoading)
    return (
      <div className={cls.EditValue}>
        <Skeleton height="520px" />
      </div>
    );
  if (isError || !allQualities) return <div>Error</div>;
  return (
    <div>
      <Card variant="default" className={cls.EditValue}>
        <div className={cls.value_name} ref={divRef}>
          <div className={cls.value_header}>
            <h3>{`Ценность №${index + 1}`}</h3>
            {!(
              newValue.value_name === '' &&
              newValue.qualities.length === 0 &&
              isOnlyValue
            ) && (
              <Button
                size="s"
                variant="ghost"
                onClick={() => setWarningCase('onDelete')}
                disabled={actionsDisabled}
              >
                Удалить ценность
              </Button>
            )}
          </div>
          <Input
            size="m"
            value={newValue.value_name}
            onChange={changeName}
            onBlur={checkName}
          />
        </div>
        <div className={cls.value_qualities}>
          <h3>Банк качеств ценности</h3>
          <div
            className={classNames(cls.drop_zone, dropZoneMods, [])}
            onDrop={handleDrop}
            onDragOver={handleDrag}
            onDragEnter={handleDrag}
            onDragLeave={handleDragLeave}
          >
            {newValue.qualities.length === 0 ? (
              <p>
                Перетаскивайте качества сюда, чтобы привязать их к ценности.
                Каждой ценности может принадлежать не более 5 качеств.
              </p>
            ) : (
              <ul>
                {newValue.qualities.map((quality) => (
                  <li key={quality.quality_name}>
                    <Tag
                      variant="secondary"
                      size="s"
                      onClick={() => deleteQuality(quality)}
                      addonRight={
                        <span className="material-symbols-outlined">close</span>
                      }
                    >
                      {quality.quality_name}
                    </Tag>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <QualitiesBank
          qualities={allQualities}
          selectedQualities={newValue.qualities}
          handleQualityClick={deleteQuality}
        />
      </Card>
      <Button
        size="m"
        variant="ghost"
        className={cls.save_button}
        disabled={
          newValue.value_name === '' ||
          newValue.qualities.length === 0 ||
          equalValues ||
          actionsDisabled
        }
        onClick={handleSaveValue}
      >
        Сохранить ценность
      </Button>
      <WarningModals
        warningCase={warningCase}
        setWarningCase={setWarningCase}
        changeQualiies={changeQualiies}
        handleDeleteValue={handleDeleteValue}
        value={value}
        setNewValue={setNewValue}
        divRef={divRef}
      />
    </div>
  );
};
