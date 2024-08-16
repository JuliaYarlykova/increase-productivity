import { Note } from '@/entities/Employee';
import { rtkApi } from '@/shared/api/rtkApi';

type NoteToPost = {
  text: string;
  employee_id: number;
};

const addNoteApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    createNote: build.mutation<Note, NoteToPost>({
      query: (note) => ({
        url: `/notes`,
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Notes'],
    }),
  }),
});

export const createEmployeeNote = addNoteApi.useCreateNoteMutation;
