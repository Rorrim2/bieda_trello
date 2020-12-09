import {empty} from "@/data_models/types";

const crypto = require('crypto');

const secret: string = 'hGMCmjxFNZC4yi1PGdM8Fl6tXpMk0m0b';

export function getSecret(): string{
    return secret;
}

function _encrypt(value: object|any): string{
    let iv = crypto.randomBytes(32).toString('hex');
    let cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(secret, 'utf-8'), Buffer.from(iv, 'hex'));
    let encrypted = cipher.update(typeof<object>(value) ? JSON.stringify(value) : value);
    let finalBuff = Buffer.concat([encrypted, cipher.final()]);
    return iv + '.' + finalBuff.toString('hex');
}

function _decrypt(encrypted: string|null) : object|string|undefined|any {
    let split = encrypted?.split('.');
    if (!split) return empty;
    let iv = Buffer.from(split[0], 'hex');
    let encryptedBuf = Buffer.from(split[1], 'hex');
    let decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(secret, "utf-8"), iv);
    let decrypted = decipher.update(encryptedBuf).toString("utf-8");
    return JSON.parse(decrypted)??decrypted;
}

export function decrypt(encrypted: string|null){
    return _decrypt(encrypted);
}

export function encrypt(value: object|any): string {
    return _encrypt(value);
}