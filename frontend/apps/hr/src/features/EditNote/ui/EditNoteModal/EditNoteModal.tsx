import { classNames } from '@repo/shared/lib';
import { Button, Loader, Modal, TextArea } from '@repo/shared/ui';
import { Suspense, useState } from 'react';

import { NoteToPost } from '../../api/editNoteApi';

import cls from './EditNoteModal.module.scss';

interface EditNoteModalProps {
  text: string;
  id: number;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onSave: (note: NoteToPost) => void;
}

export const EditNoteModal = (props: EditNoteModalProps) => {
  const { text, id, className, isOpen, onClose, onDelete, onSave } = props;
  const [newNote, setNewNote] = useState<string>(text);
  return (
    <Modal
      className={classNames('', {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <Suspense fallback={<Loader />}>
        <div className={cls.EditNoteForm}>
          <div className={cls.header}>
            <h4>Заметка</h4>
            <Button variant="close" size="l" onClick={onClose}>
              <span className="material-symbols-outlined">close</span>
            </Button>
          </div>
          <TextArea
            className={cls.textarea}
            value={newNote}
            onChange={(event) => setNewNote(event.target.value)}
            maxLength={300}
          />
          <div className={cls.buttons}>
            <Button
              fullWidth
              variant="secondary"
              className={cls.form_button}
              onClick={onDelete}
            >
              Удалить
            </Button>
            <Button
              fullWidth
              className={cls.form_button}
              onClick={() => {
                onSave({ text: newNote, id });
              }}
              disabled={newNote === text}
            >
              Сохранить
            </Button>
          </div>
        </div>
      </Suspense>
    </Modal>
  );
};
