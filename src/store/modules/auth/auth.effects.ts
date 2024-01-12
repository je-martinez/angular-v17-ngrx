import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../../auth/services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthLayoutService } from '../../../layouts/auth/services/auth-layout.service';

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
          map((data) => AuthActions.signInWGoogleSuccess({ data })),
          catchError((error) =>
            of(AuthActions.signInWGoogleFailure({ error }))
          ),
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
          map((data) => AuthActions.signUpWEmailAndPasswordSuccess({ data })),
          catchError((error) =>
            of(AuthActions.signUpWEmailAndPasswordFailure({ error }))
          ),
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
          catchError((error) =>
            of(AuthActions.signInWEmailAndPasswordFailure({ error }))
          ),
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
          map(() => AuthActions.signOutSuccess()),
          catchError(() => of(AuthActions.signOutFailure())),
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
          catchError(() => of(AuthActions.recoverUserFromStorageFailure()))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly authService: AuthService,
    private readonly authLayoutService: AuthLayoutService,
    private readonly router: Router
  ) {}
}
