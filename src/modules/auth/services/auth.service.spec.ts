import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@env/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { generateMockLocalStorageService } from '@mocks/services/local-storage.service.mock';
import { mockLoggedUser } from '@mocks/data/users.mock';
import { take } from 'rxjs';

describe('AuthService', () => {
  const setup = async (emptyUser = false) => {
    const localStorageService = generateMockLocalStorageService(emptyUser);
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())
      ],
      providers: [
        {
          provide: LocalStorageService,
          useValue: localStorageService
        }
      ]
    });
    const service = TestBed.inject(AuthService);
    return { localStorageService, service };
  };

  it('should be created', async () => {
    const { service } = await setup();
    expect(service).toBeTruthy();
  });

  it('should save user on local storage service', async () => {
    const { service, localStorageService } = await setup();
    service.saveUserOnLocalStorage(mockLoggedUser);
    expect(localStorageService.setItem).toHaveBeenCalled();
  });

  it('should remove user from local storage service', async () => {
    const { service, localStorageService } = await setup();
    service.removeUserFromLocalStorage();
    expect(localStorageService.removeItem).toHaveBeenCalled();
  });

  it('should get user from local storage service if exists', async () => {
    const { service } = await setup();
    service
      .getUserFromLocalStorage()
      .pipe(take(1))
      .subscribe((user) => {
        expect(user).toEqual(mockLoggedUser);
      });
  });

  it('should return undefined from local storage service if user doesnt exists', async () => {
    const { service } = await setup(true);
    service
      .getUserFromLocalStorage()
      .pipe(take(1))
      .subscribe((user) => {
        expect(user).toBeUndefined();
      });
  });
});
