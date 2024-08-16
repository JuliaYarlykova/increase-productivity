import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { initAuthData } from '../services/initAuthData';
import { userLogout } from '../services/userLogout';
import { User, UserSchema } from '../types/user';


const initialState: UserSchema = {
    _inited: true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
        },
        setInited: (state, { payload }: PayloadAction<boolean>) => {
            state._inited = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<User>) => {
                state.authData = payload;
                state._inited = true;
            },
        );
        builder.addCase(
            initAuthData.rejected, (state) => {
            state._inited = false;
        });
        builder.addCase(
            userLogout.fulfilled,
            (state) => {
                state._inited = false;
                state.authData = undefined;
            },
        );
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
