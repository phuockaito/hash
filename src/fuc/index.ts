
import CryptoJS from 'crypto-js';
export const handleEncrypted = (message: string, key: string) => CryptoJS.AES.encrypt(message, key).toString();
export const handleDecrypted = (encrypted: string, key: string) => CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8);