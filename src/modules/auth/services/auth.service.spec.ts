import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { Auth, User, getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '@env/environment';
import { mockLoggedUser, mockUserCredentials } from '@mocks/data/users.mock';
import { generateMockLocalStorageService } from '@mocks/services/local-storage.service.mock';
import { AuthUtils } from '@modules/auth/utils/auth.utils';
import { LocalStorageService } from '@shared/services/local-storage.service';
import { take } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const setup = async (emptyUser = false) => {
    const mockAuth = jasmine.createSpyObj('Auth', [], ['currentUser']);
    Object.defineProperty(mockAuth, 'currentUser', {
      value: mockLoggedUser
    });

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
        },
        {
          provide: Auth,
          useValue: mockAuth
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

  it('should be able to sign in with Google', fakeAsync(async () => {
    const { service } = await setup(true);
    spyOn(AuthUtils, 'signInWithPopup').and.resolveTo(mockUserCredentials);
    let user: User | undefined = undefined;
    service
      .signInWithGoogle()
      .pipe(take(1))
      .subscribe((userResponse) => {
        user = userResponse;
      });

    tick(1000);
    expect(user).toBeDefined();
    expect(AuthUtils.signInWithPopup).toHaveBeenCalled();
  }));

  it('should be able to sign in with Github', fakeAsync(async () => {
    const { service } = await setup(true);
    spyOn(AuthUtils, 'signInWithPopup').and.resolveTo(mockUserCredentials);
    let user: User | undefined = undefined;
    service
      .signInWithGithub()
      .pipe(take(1))
      .subscribe((userResponse) => {
        user = userResponse;
      });

    tick(1000);
    expect(user).toBeDefined();
    expect(AuthUtils.signInWithPopup).toHaveBeenCalled();
  }));

  it('should be able to sign in with email and password', fakeAsync(async () => {
    const { service } = await setup(true);
    spyOn(AuthUtils, 'signInWithEmailAndPassword').and.resolveTo(
      mockUserCredentials
    );
    let user: User | undefined = undefined;
    service
      .signInWithEmailAndPassword({
        email: 'fake.email@mail.com',
        password: 'fakePassword'
      })
      .pipe(take(1))
      .subscribe((userResponse) => {
        user = userResponse;
      });

    tick(1000);
    expect(user).toBeDefined();
    expect(AuthUtils.signInWithEmailAndPassword).toHaveBeenCalled();
  }));

  it('should be able to sign up with email and password', fakeAsync(async () => {
    const { service } = await setup(true);
    spyOn(AuthUtils, 'createUserWithEmailAndPassword').and.resolveTo(
      mockUserCredentials
    );
    let user: User | undefined = undefined;
    service
      .createAccount({
        email: 'new-fake.email@mail.com',
        password: 'newfakePassword'
      })
      .pipe(take(1))
      .subscribe((userResponse) => {
        user = userResponse;
      });

    tick(1000);
    expect(user).toBeDefined();
    expect(AuthUtils.createUserWithEmailAndPassword).toHaveBeenCalled();
  }));

  it('should be able to send email verification', fakeAsync(async () => {
    const { service } = await setup(true);
    spyOn(AuthUtils, 'sendEmailVerification').and.resolveTo();
    service.sendEmailVerification().pipe(take(1)).subscribe();
    tick(1000);
    expect(AuthUtils.sendEmailVerification).toHaveBeenCalled();
  }));

  it('should be able to sign out', fakeAsync(async () => {
    const { service } = await setup(true);
    spyOn(AuthUtils, 'signOut').and.resolveTo();
    service.signOut().pipe(take(1)).subscribe();
    tick(1000);
    expect(AuthUtils.signOut).toHaveBeenCalled();
  }));

  it('should be able to send password reset using an email', fakeAsync(async () => {
    const { service } = await setup(true);
    spyOn(AuthUtils, 'sendPasswordResetEmail').and.resolveTo();
    service
      .sendPasswordResetEmail('new-fake.email@mail.com')
      .pipe(take(1))
      .subscribe();
    tick(1000);
    expect(AuthUtils.sendPasswordResetEmail).toHaveBeenCalled();
  }));
});
