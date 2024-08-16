import { createAsyncThunk } from '@reduxjs/toolkit';

import { logout } from '../../api/userApi';
import { userActions } from '../slice/userSlice';

import { USER_SECRET_TOKEN } from "@/shared/const/localstorage";


export const userLogout = createAsyncThunk(
    'user/logout',
    async (_, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        try {
            const response = await dispatch(logout(''))

            if (!response) {
                return rejectWithValue('No response');
            }

            dispatch(userActions.setInited(false));
            localStorage.removeItem(USER_SECRET_TOKEN);

            return response;
        } catch (e) {
            return rejectWithValue('Fetching error');
        }
    },
);
