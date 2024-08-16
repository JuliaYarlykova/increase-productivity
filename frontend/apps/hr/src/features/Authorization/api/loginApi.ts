import { LoginSchema } from '../model/types/loginSchema';

import { rtkApi } from '@/shared/api/rtkApi';

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const loginApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    loginByPass: build.mutation<LoginResponse, LoginSchema>({
      query: ({ email, password }) => ({
        url: `/auth/login`,
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
    }),
  }),
});

export const loginByPass = loginApi.endpoints.loginByPass.initiate;
