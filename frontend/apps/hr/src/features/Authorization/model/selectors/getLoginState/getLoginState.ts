import { StateSchema } from "@/app/providers/StoreProvider";

export const getLoginState = (state: StateSchema) => state.loginForm;
export const getLoginEmail = (state: StateSchema) => state.loginForm?.email;
export const getLoginPassword = (state: StateSchema) => state.loginForm?.password;
export const getLoginIsLoading = (state: StateSchema) => state.loginForm?.isLoading;