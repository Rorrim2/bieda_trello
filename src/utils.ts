import {
    CreateCardMutation,
    CreateListMutation,
    CreateNewBoardMutation,
    EditProfile,
    LoginMutation,
    LogoutMutation,
    RefreshMutation,
    RegisterMutation,
    RevokeJTIMutation, VerifyTokenMutation
} from '@/data_models/mutations';
import {
    AuthResult, BoardModel, BoardPreview,
    Credentials, empty, ErrorCallback,
    MutationCallback, Payload, QueryCallback,
    RegisterCredentials, SingleCardModel, SingleListEntry,
    SingleListModel, StorageDescriptor, Tokens, User
} from '@/data_models/types';
import {getFromStorage, removeFromStorage, storeInStorage} from "@/store";
import {apolloClient} from "@/vue-apollo";
import {BoardQuery, BoardsQuery, ListQuery} from "@/data_models/queries";
import SingleCard from '@/components/SingleCard.vue';

export function refreshToken(tok:string, onResult: MutationCallback<Tokens>, onError: ErrorCallback){
    if(!tok || tok === "" || tok === empty) return;

    let jti = getFromStorage("jti", StorageDescriptor.local) as string;
    let user_id = getFromStorage("active_user", StorageDescriptor.local).id as string;

    apolloClient.mutate({
        mutation:RevokeJTIMutation,
        variables:{
            jti:jti,
            userId:user_id
        },

    }).then(value => {
        console.log(value.data.revokejti.success);
        if (value.data.success == true){
            removeFromStorage("jti", StorageDescriptor.local);
        }
    }).catch(error=>{
        console.debug(error.graphQLErrors[0])
    })

    apolloClient.mutate({
        mutation: RefreshMutation,
        variables: {
            refreshToken: tok
        },

    }).then(value => {
        onResult(value.data.refreshToken);
    }).catch(error => {
        console.debug(error.message);
        console.debug(error.graphQLErrors??[0]);
        onError(error);
    });
}

export function registerUser(credentials: RegisterCredentials, onResult: MutationCallback<AuthResult>, onError:ErrorCallback){
    apolloClient.mutate({
        mutation: RegisterMutation,
        variables: {
            email: credentials.email,
            password: credentials.password,
            name: credentials.name,
            lastName: credentials.lastName
        }
    }).then((value) => {
        onResult(value.data.registeruser);
    }).catch((error) => {
        onError(error);
    });
}

export function loginUser(credentials: Credentials, onResult: MutationCallback<AuthResult>, onError: ErrorCallback){
    apolloClient.mutate({
        mutation: LoginMutation,
        variables: {
            email: credentials.email,
            password: credentials.password
        }
    }).then((data) => {
        onResult(data.data.loginuser)
    }).catch((error) => {
       onError(error);
    });
}

export function logoutUser(tok: string, onResult: MutationCallback<{
    success: boolean;
}>, onError: ErrorCallback){
    apolloClient.mutate({
        mutation: LogoutMutation,
        variables: {
            refreshToken: tok
        }
    }).then(value => {
        onResult(value.data.logoutuser);
    }).catch(error => {
        console.debug(error.message);
        console.debug(error.graphQLErrors??[0]);
        onError(error);
    });
}

export function verifyToken(tkn: string, onResult: MutationCallback<Payload>, onError: ErrorCallback){
    apolloClient.mutate({
        mutation: VerifyTokenMutation,
        variables:{
            token: tkn,
        }
    }).then(value => {
        onResult(value.data.verifyToken);
    }).catch(error => {
        onError(error);
    })
}

export function decodeUrl(hashed:string):string {
    hashed = hashed.replace(/-/g, '+').replace(/_/g, '/');
    return (Buffer.from(hashed, 'base64').toString('utf-8'));
}

export function encodeUrl(url:string) :string{
    return (Buffer.from(url, 'utf-8')
        .toString('base64')).split("%")[0]
        .replace('/','/_/g').replace('+','/-/g')
}

export function parseJWT(token: string): Payload{
    let base64Url = token.split('.')[1];
    console.log(base64Url);

    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return JSON.parse(jsonPayload);
}

export function cacheRefreshToken(r_tkn: string){
    console.debug(`refresh token ${r_tkn}`);
    storeInStorage('r_tkn', r_tkn, StorageDescriptor.local);
}

export function getTokenFromCache(): string {
    return getFromStorage("r_tkn", StorageDescriptor.local) as string;
}

export function setToken(tkn: string) {
    storeInStorage("u_tkn", tkn, StorageDescriptor.local);
}

export function getToken(): string {
    return getFromStorage("u_tkn", StorageDescriptor.local);
}

export function fetchBoards(onResult:QueryCallback<Array<BoardPreview>>,
    onError: ErrorCallback) {
    apolloClient.query({
        query:BoardsQuery
    }).then(value => {
        onResult(value.data.boards);
    }).catch(reason => {
        onError(reason);
    });
}

export function fetchBoard(board_id: string, onResult:QueryCallback<BoardModel>,
                           onError: ErrorCallback){
    console.debug(`ID of BOARD: ${board_id}`);

    apolloClient.query({
        query: BoardQuery,
        variables: {
            id:board_id
        }
    }).then(value => {
        onResult(value.data.board);
    }).catch(reason => {
        onError(reason);
    })
}

export function fetchList(list_id:string, onResult:QueryCallback<SingleListModel>,
                          onError: ErrorCallback){
    console.debug(`ID of list: ${list_id}`);

    apolloClient.query({
        query: ListQuery,
        variables:{
            id:list_id,
        }
    }).then(value => {
        onResult(value.data.list);
    }).catch(reason => {
        onError(reason);
    })
}

export function createBoard(data:{background:string, title:string},
                            onResult: MutationCallback<{board:BoardPreview, success:boolean}>,
                            onError: ErrorCallback){
    console.debug(`bg: ${data.background}`);
    apolloClient.mutate({
        mutation:CreateNewBoardMutation,
        variables:{
            background:data.background,
            title:data.title
        }

    }).then(value => {
        onResult(value.data.createnewboard);
    }).catch(reason => {
        onError(reason);
    })
}

export function createList(data: SingleListEntry, onResult: MutationCallback<{list:SingleListModel, success:boolean}>,
                           onError:ErrorCallback){
    apolloClient.mutate({
        mutation: CreateListMutation,
        variables: {
            board_id: data.boardId,
            position_on_board: data.positionOnBoard,
            title: data.title
        }
    }).then(value => {
        onResult(value.data.createnewlist);
    }).catch(reason => {
        onError(reason);
    });
}

export function createCard(data: {list_id:string, title:string},
                           onResult: MutationCallback<{card:SingleCardModel, success:boolean}>,
                           onError:ErrorCallback) {
    apolloClient.mutate({
        mutation: CreateCardMutation,
        variables: {
            list_id: data.list_id,
            title: data.title,
        }
    }).then(value => {onResult(value.data.createcard);
    }).catch(reason => {onError(reason);
    });
}
export function editProfile(data:User,
                            onResult: MutationCallback<{user:User}>,
                            onError: ErrorCallback) {
    apolloClient.mutate({
        mutation:EditProfile,
        variables:{
            userId:data.id,
            email:data.email,
            name:data.name,
            lastName:data.lastName,
        }
    }).then(value => {
        onResult(value.data);
    }).catch(reason => {
        onError(reason);
    })
}
