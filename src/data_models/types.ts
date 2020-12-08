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

export interface BoardPreview {
    id: string;
    title: string;
    background: string;
}

export interface SingleCardModel {
    text: string;
}

export interface SingleListModel {
    name: string;
    listOfCards: Array<SingleCardModel>;
}

export const dummySingleListModel = <SingleListModel>{};
export const dummySingleCardModel = <SingleCardModel>{};
export const dummyBoardPreview = <BoardPreview>{};
export const dummyUser:User = <User>{};
export const dummyCredentials = <Credentials>{};
export const dummyTokens = <Tokens>{};
export const dummyRegisterCredentials = <RegisterCredentials>{};
export const dummyAuthResult = <AuthResult>{};
