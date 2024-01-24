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

describe('AuthEffects', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actions$: Observable<any>;
  const setup = async ({ errorOnSignInWithGoogle = false }) => {
    const toastProvider = generateMockToastProviderService();
    const authService = generateMockAuthService({
      errorOnSignInWithGoogle
    });
    const authLayoutService = generateMockAuthLayoutService();
    const logger = generateMockLogger();
    const router = generateMockRouter();
    const mockActions = provideMockActions(() => actions$);
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
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
        mockActions
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
});
