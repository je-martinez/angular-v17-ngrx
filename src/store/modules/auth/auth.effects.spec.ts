import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, take } from 'rxjs';

import { AuthEffects } from './auth.effects';
import { AuthService } from '@modules/auth/services/auth.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '@env/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { AuthLayoutService } from '@layouts/auth/services/auth-layout.service';
import { ToastProviderService } from '@shared/services/toast-provider.service';
import { Router } from '@angular/router';
import { generateMockToastProviderService } from '@mocks/services/toast-provider-service.mock';
import { generateMockAuthLayoutService } from '@mocks/services/auth-layout.service.mock';
import { generateMockLogger } from '@mocks/core/logger.mock';
import { generateMockRouter } from '@mocks/core/router.mock';
import { generateMockAuthService } from '@mocks/services/auth.service.mock';
import { AuthActions } from './auth.actions';

describe('AuthEffects', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authService: AuthService;
  let toastProvider: ToastProviderService;
  let authLayoutService: AuthLayoutService;
  let logger: NGXLogger;
  let router: Router;

  beforeEach(() => {
    toastProvider = generateMockToastProviderService();
    authService = generateMockAuthService();
    authLayoutService = generateMockAuthLayoutService();
    logger = generateMockLogger();
    router = generateMockRouter();
    TestBed.configureTestingModule({
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
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should execute sign in with google workflow [Success]', fakeAsync(() => {
    actions$ = of(AuthActions.signInWGoogle());

    effects.signInWGoogle$.pipe(take(1)).subscribe();

    tick(3000);

    expect(authLayoutService.showTopProgressBar).toHaveBeenCalled();
    expect(authService.signInWithGoogle).toHaveBeenCalled();
    expect(authService.saveUserOnLocalStorage).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(toastProvider.show).toHaveBeenCalled();
  }));
});
