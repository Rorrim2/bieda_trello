import {ApolloError} from "apollo-client";

export interface ActivityModel extends Node{
    card: SingleCardModel;
    content: string;
    createdOn: string;
    type: ActivityModelType;
    user: User;
}

export enum ActivityModelType {
    ACTIVITY_LOG_VAL = 1,
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

export interface BoardPreview extends Node{
    title: string;
    background: string;
    isClosed: boolean;
    isVisible: boolean;
}

export interface BoardModel extends Node{
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

export interface LabelModel extends Node{
    board: BoardModel;
    color: string;
    name: string;
}

export interface Payload{
    email: string;
    jti: string;
    origIat: number;
    exp: number;
}

export interface CloseBoardNode extends Node{
    isClosed: boolean;
}

export interface RegisterCredentials extends Credentials{
    name: string;
    lastName: string;
    confirmPassword: string;
}

export interface SingleListPreview extends Node{}

export interface BoardModel extends Node{
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

export interface SingleCardModel extends Node{
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

export interface SingleListModel extends Node{
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

export interface User extends Node{
    name: string;
    email: string;
    lastName: string;
}
export interface DeletedBoardNode {
    board: Node;
    success: boolean;
}

export interface Node {
    id: string;
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
