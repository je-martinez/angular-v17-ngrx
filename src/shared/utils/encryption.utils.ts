import * as CryptoJS from 'crypto-js';

export const encryptString = (
  stringToEncrypt: string,
  secret: string
): string => {
  return CryptoJS.AES.encrypt(stringToEncrypt, secret).toString();
};

export const decryptString = (encrypted: string, secret: string) => {
  return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
};

export const hashString = (stringToHash: string, secret: string) => {
  const hashedPassword = CryptoJS.HmacSHA256(stringToHash, secret).toString(
    CryptoJS.enc.Hex
  );
  return hashedPassword;
};
