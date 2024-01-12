import { Injectable } from '@angular/core';
import { encryptString, decryptString } from '../utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public getItem(key: string): string | undefined {
    const value = localStorage.getItem(key);
    return value
      ? decryptString(value, environment.encryption.localStorageKey)
      : undefined;
  }

  public setItem(key: string, value: string) {
    return localStorage.setItem(
      key,
      encryptString(value, environment.encryption.localStorageKey)
    );
  }

  public removeItem(key: string) {
    return localStorage.removeItem(key);
  }
}
