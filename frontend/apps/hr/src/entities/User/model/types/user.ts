export interface User {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    role_id: number;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserSchema {
    authData?: User;

    _inited: boolean;
}