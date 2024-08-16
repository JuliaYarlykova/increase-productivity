import { TextArea, Toast } from '@repo/shared/ui';
import { useState } from 'react';
import { useToaster } from 'rsuite';

import { createEmployeeNote } from '../api/addNoteApi';

import cls from './AddNote.module.scss';

interface addNoteProps {
  employeeId: number;
}

export const AddNote = (props: addNoteProps) => {
  const { employeeId } = props;
  const [note, setNote] = useState<string>('');
  const [addNote] = createEmployeeNote();
  const toaster = useToaster();

  const createNote = () => {
    if (note.trim().length > 0) {
      addNote({ text: note, employee_id: employeeId })
        .unwrap()
        .then(() => {
          setNote('');
          toaster.push(
            <Toast
              text="Заметка добавлена!"
              size="l"
              variant="success"
              addOnLeft={
                <span className="material-symbols-outlined">check_circle</span>
              }
            />,
            { placement: 'bottomCenter' },
          );
        });
    }
  };

  return (
    <TextArea
      placeholder="Текст до 300 символов с пробелами. Чтобы сохранить заметку, 
нажмите «Enter» или кликните в пустоту."
      maxLength={300}
      value={note}
      onChange={(event) => setNote(event.target.value)}
      enterFunction={createNote}
      onBlur={createNote}
      className={cls.textarea}
    />
  );
};
