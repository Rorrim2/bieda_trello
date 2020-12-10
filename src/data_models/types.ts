import {ApolloError} from "apollo-client";

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
    isClosed: boolean;
    isVisible: boolean;
}

export interface BoardModel {
    id: string;
    title: string;
    background: string;
    isClosed: boolean;
    isVisible: boolean;
    description: string;
    maker: User;
    users: Array<User>;
    admins: Array<User>;
    lists: Array<SingleListPreview>;
}

export interface SingleListPreview{
    id: string;
}

export interface SingleCardModel {
    text: string;
}

export interface SingleListModel {
    id: string;
    isHidden:boolean;
    positionOnBoard:number;
    title: string;
    cards: Array<SingleCardModel>;
}

export enum StorageDescriptor {
    local,
    session
}

export interface Payload{
    email: string;
    jti: string;
    origIat: number;
    exp: number;
}

export type MutationCallback<T> = (data: T) => void;
export type QueryCallback<T> = (data: T) => void;
export type ErrorCallback = (error: ApolloError) => void;

export const empty = Object()


export const dummySingleListModel = <SingleListModel>{};
export const dummySingleCardModel = <SingleCardModel>{};
export const dummyBoardPreview = <BoardPreview>{};
export const dummyUser:User = <User>{};
export const dummyCredentials = <Credentials>{};
export const dummyBoardModel = <BoardModel>{};
export const dummyTokens = <Tokens>{};
export const dummyRegisterCredentials = <RegisterCredentials>{};
export const dummyAuthResult = <AuthResult>{};
