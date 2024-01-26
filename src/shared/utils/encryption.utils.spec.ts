import * as CryptoJS from 'crypto-js';
import { encryptString, decryptString, hashString } from './encryption.utils';

describe('Encryption Utils', () => {
  const secret = 'my-secret-key';
  const stringToEncrypt = 'Hello, World!';

  it('should correctly encrypt and decrypt a string', () => {
    const encrypted = encryptString(stringToEncrypt, secret);
    const decrypted = decryptString(encrypted, secret);
    expect(decrypted).toBe(stringToEncrypt);
  });

  it('should correctly hash a string', () => {
    const hashed = hashString(stringToEncrypt, secret);
    const expectedHash = CryptoJS.HmacSHA256(stringToEncrypt, secret).toString(
      CryptoJS.enc.Hex
    );
    expect(hashed).toBe(expectedHash);
  });
});
