import { Button, ModalSuccess, Toast } from '@repo/shared/ui';
import { useState } from 'react';
import { useToaster } from 'rsuite';

import {
  deleteEmployeeNote,
  editEmployeeNote,
  NoteToPost,
} from '../../api/editNoteApi';
import { EditNoteModal } from '../EditNoteModal/EditNoteModal';

import { Note } from '@/entities/Employee';

import cls from './EditNote.module.scss';

interface EditNoteProps {
  note: Note;
}

export const EditNote = (props: EditNoteProps) => {
  const { note } = props;
  const [isEditNote, setIsEditNote] = useState(false);
  const [isDeleteNote, setIsDeleteNote] = useState(false);

  const [deleteNote] = deleteEmployeeNote();
  const [editNote] = editEmployeeNote();

  const handleNoteClick = () => {
    setIsEditNote(true);
  };

  const toaster = useToaster();

  const onEdit = (note: NoteToPost) => {
    editNote(note)
      .unwrap()
      .then(() => {
        toaster.push(
          <Toast
            text="Изменения сохранены!"
            size="l"
            variant="success"
            addOnLeft={
              <span className="material-symbols-outlined">check_circle</span>
            }
          />,
          { placement: 'bottomCenter' },
        );
      });
  };

  const onDelete = () => {
    deleteNote(note.id)
      .unwrap()
      .then(() => {
        setIsDeleteNote(false);
        toaster.push(
          <Toast
            text="Заметка удалена!"
            size="l"
            variant="success"
            addOnLeft={
              <span className="material-symbols-outlined">check_circle</span>
            }
          />,
          { placement: 'bottomCenter' },
        );
      });
  };

  return (
    <>
      <Button
        key={note.id}
        variant="secondary"
        size="s"
        onClick={handleNoteClick}
        className={cls.note_button}
      >
        <span className={cls.note_title}>{note.text}</span>
      </Button>
      {isEditNote && (
        <EditNoteModal
          text={note.text}
          isOpen={isEditNote}
          onClose={() => setIsEditNote(false)}
          onDelete={() => {
            setIsEditNote(false);
            setIsDeleteNote(true);
          }}
          id={note.id}
          onSave={onEdit}
        />
      )}
      {isDeleteNote && (
        <ModalSuccess
          title="Подтвердите действие"
          text="Вы уверены? Заметка будет безвозвратно удалена"
          button={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button
                variant="secondary"
                fullWidth
                onClick={() => {
                  setIsDeleteNote(false);
                  setIsEditNote(true);
                }}
              >
                Отменить
              </Button>
              <Button fullWidth onClick={onDelete}>
                Удалить
              </Button>
            </div>
          }
          variant="constructor"
          isOpen={isDeleteNote}
          onClose={() => setIsDeleteNote(false)}
        />
      )}
    </>
  );
};
