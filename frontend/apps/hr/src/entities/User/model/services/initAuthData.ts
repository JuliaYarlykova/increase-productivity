import { createAsyncThunk } from '@reduxjs/toolkit';

import { userActions } from '../..';
import { getUserDataByTokenQuery } from '../../api/userApi';
import { User } from '../../model/types/user';

import { ThunkConfig } from "@/app/providers/StoreProvider";


export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkApi) => {
        const { rejectWithValue, dispatch  } = thunkApi;

        try {
            const response = await dispatch(
                getUserDataByTokenQuery(''),
            ).unwrap();

            if (!response || !response.first_name) {
                return rejectWithValue('No response');
            }

            dispatch(userActions.setInited(true));

            return response;
        } catch (e) {
            return rejectWithValue('Fetching error');
        }
    },
);
