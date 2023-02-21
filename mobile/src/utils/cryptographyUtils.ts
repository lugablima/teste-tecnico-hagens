import crypto from "crypto-js";
import { CRYPTO_SECRET_KEY } from "@env";

export function encrypt(data: string) {
    return crypto.AES.encrypt(data, CRYPTO_SECRET_KEY).toString();
}

export function decrypt(encryptedData: string) {
    return crypto.AES.decrypt(encryptedData, CRYPTO_SECRET_KEY).toString(crypto.enc.Utf8);
}