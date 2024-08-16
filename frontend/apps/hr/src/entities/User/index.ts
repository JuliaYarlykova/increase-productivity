export {
    userReducer,
    userActions,
} from './model/slice/userSlice';

export { userLogout } from './model/services/userLogout';
export { initAuthData } from './model/services/initAuthData';
export { getInitedState } from './model/selectors/getInitedState/getInitedState';

export type {
    UserSchema,
    User,
} from "./model/types/user";