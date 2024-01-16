import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';
import { AuthService } from '@modules/auth/services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthLayoutService } from '@layouts/auth/services/auth-layout.service';
import { ToastProviderService } from '@shared/services/toast-provider.service';
import { ToastPosition, ToastType } from '@shared/types/toast-provider.enums';
import { NGXLogger } from 'ngx-logger';
import { FirebaseAuthError } from '@modules/auth/types/auth.types';
import { getSignInWithPopupErrorByCode } from '@shared/utils/errors.utils';

@Injectable()
export class AuthEffects {
  //Sign Up w/ Google
  signInWGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWGoogle),
      tap({ next: () => this.authLayoutService.showTopProgressBar(true) }),
      exhaustMap(() =>
        this.authService.signInWithGoogle().pipe(
          tap({
            next: (data) => this.authService.saveUserOnLocalStorage(data)
          }),
          tap({
            next: () => this.router.navigate(['home/content-wall'])
          }),
          tap({
            next: () => {
              this.toastProvider.show({
                message: 'Welcome to the app!',
                type: ToastType.Success,
                position: ToastPosition.TopRight
              });
            }
          }),
          map((data) => AuthActions.signInWGoogleSuccess({ data })),
          catchError((error: FirebaseAuthError) => {
            this.logger.error({ error });
            this.toastProvider.show({
              message: getSignInWithPopupErrorByCode(error.code),
              type: ToastType.Error
            });
            return of(AuthActions.signInWGoogleFailure({ error }));
          }),
          tap(() => this.authLayoutService.showTopProgressBar(false))
        )
      )
    );
  });

  //Sign Up w/ Github
  signInWGithub$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWGithub),
      tap({ next: () => this.authLayoutService.showTopProgressBar(true) }),
      exhaustMap(() =>
        this.authService.signInWithGithub().pipe(
          tap({
            next: (data) => this.authService.saveUserOnLocalStorage(data)
          }),
          tap({
            next: () => this.router.navigate(['home/content-wall'])
          }),
          tap({
            next: () => {
              this.toastProvider.show({
                message: 'Welcome to the app!',
                type: ToastType.Success,
                position: ToastPosition.TopRight
              });
            }
          }),

          map((data) => AuthActions.signInWGithubSuccess({ data })),
          catchError((error: FirebaseAuthError) => {
            this.logger.error({ error });
            this.toastProvider.show({
              message: getSignInWithPopupErrorByCode(error.code),
              type: ToastType.Error
            });
            return of(AuthActions.signInWGithubFailure({ error }));
          }),
          tap(() => this.authLayoutService.showTopProgressBar(false))
        )
      )
    );
  });

  //Sign Up w/ Email and Password
  signUpWEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUpWEmailAndPassword),
      tap({ next: () => this.authLayoutService.showTopProgressBar(true) }),
      exhaustMap(({ input }) =>
        this.authService.createAccount(input).pipe(
          tap({
            next: (data) => this.authService.saveUserOnLocalStorage(data)
          }),
          tap({
            next: () => this.router.navigate(['home/content-wall'])
          }),
          tap({
            next: () => {
              this.toastProvider.show({
                message: 'Welcome to the app!',
                type: ToastType.Success,
                position: ToastPosition.TopRight
              });
            }
          }),
          map((data) => AuthActions.signUpWEmailAndPasswordSuccess({ data })),
          catchError((error: FirebaseAuthError) => {
            this.logger.error({ error });
            this.toastProvider.show({
              message: getSignInWithPopupErrorByCode(error.code),
              type: ToastType.Error
            });
            return of(AuthActions.signUpWEmailAndPasswordFailure({ error }));
          }),
          tap({ next: () => this.authLayoutService.showTopProgressBar(false) })
        )
      )
    );
  });

  //Sign In w/ Email and Password
  signInWEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWEmailAndPassword),
      tap({ next: () => this.authLayoutService.showTopProgressBar(true) }),
      exhaustMap(({ input }) =>
        this.authService.signInWithEmailAndPassword(input).pipe(
          tap({
            next: (data) => this.authService.saveUserOnLocalStorage(data)
          }),
          tap({
            next: () => this.router.navigate(['home/content-wall'])
          }),
          map((data) => AuthActions.signInWEmailAndPasswordSuccess({ data })),
          catchError((error: FirebaseAuthError) => {
            this.logger.error({ error });
            this.toastProvider.show({
              message: getSignInWithPopupErrorByCode(error.code),
              type: ToastType.Error,
              position: ToastPosition.TopRight
            });
            return of(AuthActions.signInWEmailAndPasswordFailure({ error }));
          }),
          tap({ next: () => this.authLayoutService.showTopProgressBar(false) })
        )
      )
    );
  });

  signOut$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap(() =>
        this.authService.signOut().pipe(
          tap({
            next: () => this.authService.removeUserFromLocalStorage()
          }),
          tap({
            next: () => {
              this.toastProvider.show({
                message: 'Bye bye!',
                type: ToastType.Success,
                position: ToastPosition.TopRight
              });
            }
          }),
          map(() => AuthActions.signOutSuccess()),
          catchError((error: FirebaseAuthError) => {
            this.logger.error({ error });
            this.toastProvider.show({
              message: getSignInWithPopupErrorByCode(error.code),
              type: ToastType.Error
            });
            return of(AuthActions.signOutFailure());
          }),
          tap({
            next: () => this.router.navigate(['auth/login'])
          })
        )
      )
    );
  });

  //Recover User From Storage
  recoverUserFromStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.recoverUserFromStorage),
      exhaustMap(() =>
        this.authService.getUserFromLocalStorage().pipe(
          map((data) => {
            return data
              ? AuthActions.recoverUserFromStorageSuccess({ data })
              : AuthActions.recoverUserFromStorageFailure();
          }),
          catchError((error: FirebaseAuthError) => {
            this.logger.error({ error });
            return of(AuthActions.recoverUserFromStorageFailure());
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly authService: AuthService,
    private readonly toastProvider: ToastProviderService,
    private readonly authLayoutService: AuthLayoutService,
    private readonly logger: NGXLogger,
    private readonly router: Router
  ) {}
}
