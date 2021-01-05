import {ApolloError} from "apollo-client";

export interface ActivityModel {
    card: SingleCardModel;
    content: string;
    createdOn: string;
    id: string;
    type: ActivityModelType;
    user: User;
}

enum ActivityModelType {
    ACTIVITY_LOG_VAL,
    COMMENT_VAL,
    CHECKLIST_VAL,
    ATTACHMENT_VAL,
}

export interface AuthResult {
    user: User;
    success: boolean;
    token: string;
    refreshToken: string;
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

export interface Credentials {
    email: string;
    password: string;
}

export interface LabelModel {
    board: BoardModel;
    color: string;
    id: string;
    name: string;
}

export interface Payload{
    email: string;
    jti: string;
    origIat: number;
    exp: number;
}

export interface RegisterCredentials extends Credentials{
    name: string;
    lastName: string;
    confirmPassword: string;
}

export interface SingleListPreview{
    id: string;
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

export interface SingleCardModel {
    id: string;
    cover: string;
    description: string;
    dueDate: string;
    title: string;
    positionInList: number;
    activities: Array<ActivityModel>;
    archived: boolean;
    labels: Array<LabelModel>;
}

export interface SingleListEntry {
    boardId:string;
    positionOnBoard:number;
    title: string;
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

export interface Tokens {
    token: string;
    refreshToken: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    lastName: string;
}

export type MutationCallback<T> = (data: T) => void;
export type QueryCallback<T> = (data: T) => void;
export type ErrorCallback = (error: ApolloError) => void;

export const empty = Object();

export const dummySingleListEntry = <SingleListEntry>{};
export const dummySingleListModel = <SingleListModel>{};
export const dummySingleCardModel = <SingleCardModel>{};
export const dummyBoardPreview = <BoardPreview>{};
export const dummyActivityModel = <ActivityModel>{};
export const dummyLabelModel = <LabelModel>{};
export const dummyUser:User = <User>{};
export const dummyCredentials = <Credentials>{};
export const dummyBoardModel = <BoardModel>{};
export const dummyTokens = <Tokens>{};
export const dummyRegisterCredentials = <RegisterCredentials>{};
export const dummyAuthResult = <AuthResult>{};
