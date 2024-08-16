import { Note } from '@/entities/Employee';
import { rtkApi } from '@/shared/api/rtkApi';

const notesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getEmployeeNotes: build.query<Note[], number>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: { data: Note[] }) => response.data,
      providesTags: (result, error, id) => [{ type: 'Notes', id }],
    }),
  }),
});

export const getEmployeeNotes = notesApi.useGetEmployeeNotesQuery;
