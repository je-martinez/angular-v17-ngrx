import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { environment } from '@env/environment';
import { decryptString } from '../utils/encryption.utils';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  const fakeKeys: Record<string, string> = {
    'test-key-1': 'test-value-1',
    'test-key-2': 'test-value-2',
    'test-key-3': 'test-value-3',
    'test-key-4': 'test-value-4'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);

    //Local Storage Mock
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return fakeKeys[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (fakeKeys[key] = value as string);
      }
    );
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete fakeKeys[key];
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a value from local storage', () => {
    const key = 'test-key-1';
    const value = service.getItem(key);
    const decryptedValue = decryptString(
      value!,
      environment.encryption.localStorageKey
    );
    expect(value).toBe(decryptedValue);
  });

  it('should return undefined if value doesnt exists on local storage', () => {
    const key = 'non-existing-key';
    const value = service.getItem(key);
    expect(value).toBeUndefined();
  });

  it('should set a value on local storage', () => {
    const key = 'new-key-1';
    const value = 'new-value-1';
    service.setItem(key, value);
    expect(
      decryptString(fakeKeys[key], environment.encryption.localStorageKey)
    ).toBe(value);
  });

  it('should it shoud remove a value from local storage', () => {
    const key = 'test-key-1';
    service.removeItem(key);
    expect(fakeKeys[key]).toBeUndefined();
  });
});
