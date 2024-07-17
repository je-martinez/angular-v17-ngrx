import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, take } from 'rxjs';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { AuthLayoutService } from '@layouts/auth/services/auth-layout.service';
import { generateMockLogger } from '@mocks/core/logger.mock';
import { generateMockRouter } from '@mocks/core/router.mock';
import { generateMockAuthLayoutService } from '@mocks/services/auth-layout.service.mock';
import { generateMockAuthService } from '@mocks/services/auth.service.mock';
import { generateMockToastProviderService } from '@mocks/services/toast-provider-service.mock';
import { AuthService } from '@modules/auth/services/auth.service';
import { ToastProviderService } from '@shared/services/toast-provider.service';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { AuthActions } from './auth.actions';
import { AuthEffects } from './auth.effects';
import { SignUpOrLoginFormDTO } from '@modules/auth/types/auth.DTOs';

describe('AuthEffects', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actions$: Observable<any>;
  const setup = async ({
    errorOnSignInWithGoogle = false,
    errorOnSignInWithGithub = false,
    errorOnSignInWithEmailAndPassword = false,
    errorOnSignUpWithEmailAndPassword = false,
    errorOnSignOut = false,
    errorOnGetUserFromLocalStorage = false,
    userOnStorage = true
  }) => {
    const toastProvider = generateMockToastProviderService();
    const authService = generateMockAuthService({
      errorOnSignInWithGoogle,
      errorOnSignInWithGithub,
      errorOnSignInWithEmailAndPassword,
      errorOnSignUpWithEmailAndPassword,
      errorOnSignOut,
      errorOnGetUserFromLocalStorage,
      userOnStorage
    });
    const authLayoutService = generateMockAuthLayoutService();
    const logger = generateMockLogger();
    const router = generateMockRouter();
    const mockActions = provideMockActions(() => actions$);
    await TestBed.configureTestingModule({
      imports: [
        LoggerModule.forRoot({
          level: NgxLoggerLevel.DEBUG,
          serverLogLevel: NgxLoggerLevel.ERROR
        })
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authService
        },
        {
          provide: ToastProviderService,
          useValue: toastProvider
        },
        {
          provide: AuthLayoutService,
          useValue: authLayoutService
        },
        {
          provide: NGXLogger,
          useValue: logger
        },
        {
          provide: Router,
          useValue: router
        },
        AuthEffects,
        mockActions,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())
      ]
    });

    const effects = TestBed.inject(AuthEffects);

    return {
      effects,
      authService,
      toastProvider,
      authLayoutService,
      logger,
      router
    };
  };

  it('should be created', async () => {
    const { effects } = await setup({});
    expect(effects).toBeTruthy();
  });

  it('should execute sign in with google workflow [Success]', fakeAsync(async () => {
    const { effects, authLayoutService, authService, router, toastProvider } =
      await setup({});

    actions$ = of(AuthActions.signInWGoogle());

    effects.signInWGoogle$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authLayoutService.showTopProgressBar).toHaveBeenCalledWith(true);
    expect(authService.signInWithGoogle).toHaveBeenCalled();
    expect(authService.saveUserOnLocalStorage).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
    expect(authLayoutService.showTopProgressBar).toHaveBeenCalledWith(false);
  }));

  it('should execute sign in with google workflow [Failure]', fakeAsync(async () => {
    const { effects, logger, authService, toastProvider } = await setup({
      errorOnSignInWithGoogle: true
    });
    actions$ = of(AuthActions.signInWGoogle());

    effects.signInWGoogle$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authService.signInWithGoogle).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
  }));

  it('should execute sign in with Github workflow [Success]', fakeAsync(async () => {
    const { effects, authLayoutService, authService, router, toastProvider } =
      await setup({});

    actions$ = of(AuthActions.signInWGithub());

    effects.signInWGithub$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authLayoutService.showTopProgressBar).toHaveBeenCalledWith(true);
    expect(authService.signInWithGithub).toHaveBeenCalled();
    expect(authService.saveUserOnLocalStorage).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
    expect(authLayoutService.showTopProgressBar).toHaveBeenCalledWith(false);
  }));

  it('should execute sign in with Github workflow [Failure]', fakeAsync(async () => {
    const { effects, logger, authService, toastProvider } = await setup({
      errorOnSignInWithGithub: true
    });
    actions$ = of(AuthActions.signInWGithub());

    effects.signInWGithub$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authService.signInWithGithub).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
  }));

  it('should execute sign in with email and password workflow [Success]', fakeAsync(async () => {
    const { effects, authLayoutService, authService, router, toastProvider } =
      await setup({});

    const input: SignUpOrLoginFormDTO = {
      email: 'fake-email@mail.com',
      password: 'fake-password'
    };

    actions$ = of(AuthActions.signInWEmailAndPassword({ input }));

    effects.signInWEmailAndPassword$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authLayoutService.showTopProgressBar).toHaveBeenCalledWith(true);
    expect(authService.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(authService.saveUserOnLocalStorage).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
    expect(authLayoutService.showTopProgressBar).toHaveBeenCalledWith(false);
  }));

  it('should execute sign in with email and password workflow [Failure]', fakeAsync(async () => {
    const { effects, logger, authService, toastProvider } = await setup({
      errorOnSignInWithEmailAndPassword: true
    });

    const input: SignUpOrLoginFormDTO = {
      email: 'fake-email@mail.com',
      password: 'fake-password'
    };

    actions$ = of(AuthActions.signInWEmailAndPassword({ input }));

    effects.signInWEmailAndPassword$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authService.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
  }));

  it('should execute sign up with email and password workflow [Success]', fakeAsync(async () => {
    const { effects, authLayoutService, authService, router, toastProvider } =
      await setup({});

    const input: SignUpOrLoginFormDTO = {
      email: 'fake-email@mail.com',
      password: 'fake-password'
    };

    actions$ = of(AuthActions.signUpWEmailAndPassword({ input }));

    effects.signUpWEmailAndPassword$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authLayoutService.showTopProgressBar).toHaveBeenCalledWith(true);
    expect(authService.createAccount).toHaveBeenCalled();
    expect(authService.saveUserOnLocalStorage).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
    expect(authLayoutService.showTopProgressBar).toHaveBeenCalledWith(false);
  }));

  it('should execute sign up with email and password workflow [Failure]', fakeAsync(async () => {
    const { effects, logger, authService, toastProvider } = await setup({
      errorOnSignUpWithEmailAndPassword: true
    });

    const input: SignUpOrLoginFormDTO = {
      email: 'fake-email@mail.com',
      password: 'fake-password'
    };

    actions$ = of(AuthActions.signUpWEmailAndPassword({ input }));

    effects.signUpWEmailAndPassword$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authService.createAccount).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
  }));

  it('should execute sign out workflow [Success]', fakeAsync(async () => {
    const { effects, authService, router, toastProvider } = await setup({});

    actions$ = of(AuthActions.signOut());

    effects.signOut$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authService.signOut).toHaveBeenCalled();
    expect(authService.removeUserFromLocalStorage).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
  }));

  it('should execute sign out workflow [Failure]', fakeAsync(async () => {
    const { effects, logger, authService, toastProvider } = await setup({
      errorOnSignOut: true
    });

    actions$ = of(AuthActions.signOut());

    effects.signOut$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authService.signOut).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
  }));

  it('should execute recover user from storage workflow [Success]', fakeAsync(async () => {
    const { effects, authService, logger } = await setup({});

    actions$ = of(AuthActions.recoverUserFromStorage());

    effects.recoverUserFromStorage$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authService.getUserFromLocalStorage).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  }));

  it('should execute recover user from storage workflow [Success - No User on Local Storage]', fakeAsync(async () => {
    const { effects, authService, logger } = await setup({
      userOnStorage: false
    });

    actions$ = of(AuthActions.recoverUserFromStorage());

    effects.recoverUserFromStorage$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authService.getUserFromLocalStorage).toHaveBeenCalled();
    expect(logger.error).not.toHaveBeenCalled();
  }));

  it('should execute recover user from storage workflow [Failure]', fakeAsync(async () => {
    const { effects, logger, authService } = await setup({
      errorOnGetUserFromLocalStorage: true
    });

    actions$ = of(AuthActions.recoverUserFromStorage());

    effects.recoverUserFromStorage$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authService.getUserFromLocalStorage).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalled();
  }));
});
