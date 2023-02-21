import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_TOKEN_KEY } from "@env";
import { decrypt, encrypt } from "./cryptographyUtils";
   
export async function fetchAsyncStorageToken() {
    const encryptedToken = await AsyncStorage.getItem(ASYNC_STORAGE_TOKEN_KEY);
    
    if(!encryptedToken) return null;
    
    return decrypt(encryptedToken);
} 

export async function setAsyncStorageToken(token: string) {
    const encryptedToken = encrypt(token);

    await AsyncStorage.setItem(ASYNC_STORAGE_TOKEN_KEY, encryptedToken);
}

export async function removeAsyncStorageToken() {
    await AsyncStorage.removeItem(ASYNC_STORAGE_TOKEN_KEY);
} 