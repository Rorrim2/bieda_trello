export interface User {
    id: string;
    name: string;
    lastName: string;
}

export interface LoginUser {
    user: User;
    success: boolean;
    token: string;
}

export interface Credentials {
    email: string;
    password: string;
}