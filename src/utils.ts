import {LogoutMutation,
        RefreshMutation,
        RevokeJTIMutation} from "@/data_models/mutations";
import {Tokens} from "@/data_models/types";
import dataBus from "@/databus";
import {vm} from "@/main";

const empty = Object()

export function refreshToken(tok:string, fn: any){
    if(!tok || tok === "" || tok === empty) return;

    let jti = getFromLocalStorage("jti") as string;
    let user_id = getFromLocalStorage("active_user").id as string;

    vm.$apollo.mutate({
        mutation:RevokeJTIMutation,
        variables:{
            jti:jti,
            userId:user_id
        },

    }).then(value => {
        console.log(value.data.revokejti.success);
        if (value.data.success == true){
            localStorage.removeItem("jti");
        }
    }).catch(error=>{
        console.debug(error.graphQLErrors[0])
    })

    vm.$apollo.mutate({
        mutation: RefreshMutation,
        variables: {
            refreshToken: tok
        }
    }).then(value => {
        let tokens = <Tokens>value.data.refreshToken;
        fn(tokens);
    }).catch(error => {
        console.debug(error.graphQLErrors[0])
    });
}

const crypto = require('crypto');

const secret: string = 'hGMCmjxFNZC4yi1PGdM8Fl6tXpMk0m0b';

export function getSecret(): string{
    return secret;
}

export function storeInLocalStorage(key: string, value: object|any){
    let iv = crypto.randomBytes(32).toString('hex');
    let cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(secret, 'utf-8'), Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(typeof<object>(value) ? JSON.stringify(value) : value);
    let finalBuff = Buffer.concat([encrypted, cipher.final()]);
    let encrypted_token = iv + '.' + finalBuff.toString('hex');
    localStorage.setItem(key, encrypted_token)
}

export function getFromLocalStorage(key: string): object|string|undefined|any {
    let encrypted_token = localStorage.getItem(key);
    let split = encrypted_token?.split('.');
    if (!split) return empty;
    let iv = Buffer.from(split[0], 'hex');
    let encrypted = Buffer.from(split[1], 'hex');
    let decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(secret, "utf-8"), iv);
    let decrypted = decipher.update(encrypted).toString("utf-8");
    return JSON.parse(decrypted)??decrypted;
}

export function logoutUser(tok: string, fn: any){
    vm.$apollo.mutate({
        mutation: LogoutMutation,
        variables: {
            refreshToken: tok
        }
    }).then(value => {
        let logoutResult = value.data.logoutuser;
        fn(logoutResult);
    }).catch(error => {
        console.debug(error.graphQLErrors[0]);
    });
}

export function parseJWT(token: string): any{
    let base64Url = token.split('.')[1];
    console.log(base64Url);

    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return JSON.parse(jsonPayload);
}

export function cacheRefreshToken(r_tkn: string){
    console.debug(`refresh token ${r_tkn}`);
    storeInLocalStorage('r_tkn', r_tkn);
}

export function getTokenFromCache(): string {
    return getFromLocalStorage("r_tkn") as string;
}
