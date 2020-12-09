import {StorageDescriptor} from "@/data_models/types";
import {decrypt, encrypt} from "@/crypto";


export function storeInStorage(key:string, value: object|any, storage:StorageDescriptor){
    let encrypted_token = encrypt(value);
    if(storage === StorageDescriptor.session){
        storeInSessionStorage(key, encrypted_token);
    }
    else{
        storeInLocalStorage(key, encrypted_token);
    }
}

export function removeFromStorage(key:string, storage:StorageDescriptor){
    return (storage === StorageDescriptor.local) ?
        localStorage.removeItem(key) : sessionStorage.removeItem(key);
}

function storeInLocalStorage(key: string, value: string){
    localStorage.setItem(key, value);
}

function storeInSessionStorage(key: string, value: string){
    sessionStorage.setItem(key, value);
}

function getFromLocalStorage(key: string): string|null {
    return localStorage.getItem(key);
}

function getFromSessionStorage(key: string): string|null {
    return sessionStorage.getItem(key);
}

export function getFromStorage(key: string, storage: StorageDescriptor): object|string|undefined|any {
    let encrypted_token = (storage === StorageDescriptor.local) ? getFromLocalStorage(key) : getFromSessionStorage(key);
    return decrypt(encrypted_token);
}