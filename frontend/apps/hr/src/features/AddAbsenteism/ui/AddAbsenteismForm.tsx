import { useMaskito } from '@maskito/react';
import { Input, Toast, Text } from '@repo/shared/ui';
import { memo, useCallback, useEffect, useState } from 'react';
import { useToaster } from 'rsuite';

import { postAbsenteism } from '../api/absenteismApi';
import inputMask from '../lib/mask';

interface AddAbsenteismFormProps {
  absenteism: string;
  isLoading: boolean;
}

export const AddAbsenteismForm = memo((props: AddAbsenteismFormProps) => {
  const { absenteism, isLoading } = props;
  const mask = useMaskito({ options: inputMask });
  const [value, setValue] = useState<string | undefined>(undefined);
  const [setAbsenteism, { isSuccess }] = postAbsenteism();
  const toaster = useToaster();

  const onSubmit = useCallback(
    async (data: React.FocusEvent<HTMLInputElement, Element>) => {
      await setAbsenteism({
        coefficient: Number(data.currentTarget.value.split('%')[0]) / 100,
      });
    },
    [setAbsenteism],
  );

  useEffect(() => {
    if (isSuccess) {
      toaster.push(
        <Toast
          text="Изменения сохранены"
          size="l"
          variant="success"
          addOnLeft={
            <span className="material-symbols-outlined">check_circle</span>
          }
        />,
        { placement: 'bottomCenter' },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (isLoading) return <Text text="Загрузка данных..." size="s" />;

  return (
    <Input
      type="text"
      placeholder="Абсентеизм"
      size="l"
      maskedInputRef={mask}
      value={value || `${absenteism}%`}
      onInput={(e) => setValue(e.currentTarget.value)}
      onBlur={onSubmit}
    />
  );
});
