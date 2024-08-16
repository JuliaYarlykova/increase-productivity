import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { login } from '../..';
import { LoginSchema } from '../types/loginSchema';


const initialState: LoginSchema = {
    email: '',
    password: '',
    isLoading: false,
    error: false,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                login.fulfilled,
                (state ) => {
                    state.isLoading = false;
                },
            )
            .addCase(login.rejected, (state ) => {
                state.isLoading = false;
                state.error = true;
            });
    },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;