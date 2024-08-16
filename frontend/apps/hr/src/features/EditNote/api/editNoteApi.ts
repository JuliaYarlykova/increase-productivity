import { Note } from '@/entities/Employee';
import { rtkApi } from '@/shared/api/rtkApi';

export type NoteToPost = {
  text: string;
  id: number;
};

const editNoteApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    editNote: build.mutation<Note, NoteToPost>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: 'PUT',
        body: { text: note.text },
      }),
      invalidatesTags: ['Notes'],
    }),
    deleteNote: build.mutation<string, number>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes'],
    }),
  }),
});

export const editEmployeeNote = editNoteApi.useEditNoteMutation;
export const deleteEmployeeNote = editNoteApi.useDeleteNoteMutation;
