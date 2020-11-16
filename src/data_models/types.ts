export interface User {
    id: string;
    name: string;
    lastName: string;
}

export interface LoginUser {
    user: User;
    success: boolean;
    token: string;
    refreshToken: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface Tokens {
    token: string;
    refreshToken: string;
}

export interface RegisterCredentials extends Credentials{
    name: string;
    lastName: string;
    confirmPassword: string;
}