export interface User {
    id: string;
    name: string;
    email: string;
    lastName: string;
}

export interface AuthResult {
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

export const dummyUser:User = <User>{};
export const dummyCredentials = <Credentials>{};
export const dummyTokens = <Tokens>{};
export const dummyRegisterCredentials = <RegisterCredentials>{};
export const dummyAuthResult = <AuthResult>{};
