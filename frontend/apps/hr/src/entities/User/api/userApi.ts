import { User } from '../model/types/user';

import { rtkApi } from '@/shared/api/rtkApi';

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserDataByToken: build.query<User, string>({
            query: () => ({
                url: `/user`,
                method: 'GET',
            }),
        }),
        logout: build.mutation({
            query: () => ({
                url: `/auth/logout`,
                method: 'POST',
            }),
        }),
    }),
});

export const getUserDataByTokenQuery = userApi.endpoints.getUserDataByToken.initiate;
export const logout = userApi.endpoints.logout.initiate;
