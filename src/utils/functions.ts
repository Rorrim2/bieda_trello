import {Payload, StorageDescriptor} from '@/data_models/types';
import {getFromStorage, storeInStorage} from "@/store";

export * from '@/utils/db_operations/lists'
export * from '@/utils/db_operations/users'
export * from '@/utils/db_operations/tokens'
export * from '@/utils/db_operations/boards'
export * from '@/utils/db_operations/cards'

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
