import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../../auth/services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  //Sign Up w/ Google
  signInWGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWGoogle),
      exhaustMap(() =>
        this.authService.signInWithGoogle().pipe(
          tap({
            next: (data) => this.authService.saveUserOnLocalStorage(data)
          }),
          tap({
            next: () => this.router.navigate(['home/content-wall'])
          }),
          map((data) => AuthActions.signInWGoogleSuccess({ data })),
          catchError((error) => of(AuthActions.signInWGoogleFailure({ error })))
        )
      )
    );
  });

  //Sign Up w/ Email and Password
  signUpWEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUpWEmailAndPassword),
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
          )
        )
      )
    );
  });

  //Sign In w/ Email and Password
  signInWEmailAndPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWEmailAndPassword),
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
          )
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
    private readonly router: Router
  ) {}
}
