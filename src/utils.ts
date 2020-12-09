import {
    LoginMutation,
    LogoutMutation,
    RefreshMutation,
    RegisterMutation,
    RevokeJTIMutation, VerifyTokenMutation
} from "@/data_models/mutations";
import {
    AuthResult,
    Credentials,
    empty,
    ErrorCallback,
    MutationCallback, Payload,
    RegisterCredentials,
    StorageDescriptor, Tokens
} from "@/data_models/types";
import {vm} from "@/main";
import {getFromStorage, removeFromStorage, storeInStorage} from "@/store";
import {apolloClient} from "@/vue-apollo";

export function refreshToken(tok:string, onResult: MutationCallback<Tokens>, onError: ErrorCallback){
    if(!tok || tok === "" || tok === empty) return;

    let jti = getFromStorage("jti", StorageDescriptor.local) as string;
    let user_id = getFromStorage("active_user", StorageDescriptor.local).id as string;

    vm.$apollo.mutate({
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

    vm.$apollo.mutate({
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
    vm.$apollo.mutate({
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
    vm.$apollo.mutate({
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
    vm.$apollo.mutate({
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

