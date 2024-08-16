import { Button, Card, Text } from '@repo/shared/ui';

import { getEmployeeNotes } from './api/notesApi';

import { Employee } from '@/entities/Employee';
import { AddNote } from '@/features/AddNote';
import { EditNote } from '@/features/EditNote';

import cls from './EmployeeNotes.module.scss';

interface EmployeeNotesProps {
  employee: Employee;
}

export const EmployeeNotes = (props: EmployeeNotesProps) => {
  const { employee } = props;
  const { data: notes, isLoading, isError } = getEmployeeNotes(employee.id);

  return (
    <Card variant="light" padding="16" className={cls.EmployeeNotes}>
      <Text title="Заметки" size="s" bold />
      <AddNote employeeId={employee.id} />
      {notes && (
        <div className={cls.notes}>
          <div className={cls.notes_list}>
            {notes.slice(0, 8).map((note, key) => (
              <EditNote note={note} key={key} />
            ))}
          </div>
          {notes.length > 8 && (
            <Button variant="ghost" size="s">
              Открыть все
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};
