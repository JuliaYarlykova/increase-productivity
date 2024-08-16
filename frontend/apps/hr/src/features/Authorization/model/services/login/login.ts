import { createAsyncThunk } from '@reduxjs/toolkit';

import { loginByPass } from '../../../api/loginApi';
import { LoginSchema } from '../../types/loginSchema';

import { userActions } from "@/entities/User";
import { USER_SECRET_TOKEN } from '@/shared/const/localstorage';

export const login = createAsyncThunk(
  'login/loginByPassword',
  async (authData: LoginSchema, { rejectWithValue, dispatch }) => {
    try {
      const response = await dispatch(loginByPass(authData)).unwrap();

      if (!response || !response.access_token) {
        return rejectWithValue('error');
      }

      localStorage.setItem(USER_SECRET_TOKEN, response.access_token);
      dispatch(userActions.setInited(true));
      window.location.reload();

      return response;
    } catch (e) {
      return rejectWithValue('error');
    }
  },
);
