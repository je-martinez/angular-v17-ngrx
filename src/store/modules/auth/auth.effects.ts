import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../../auth/services/auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  //Sign Up w/ Google
  signUpWGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signUpWGoogle),
      exhaustMap(() =>
        this.authService.signUpWithGoogle().pipe(
          tap({
            next: (data) => this.authService.saveUserOnLocalStorage(data)
          }),
          map((data) => AuthActions.signUpWGoogleSuccess({ data })),
          catchError((error) => of(AuthActions.signUpWGoogleFailure({ error })))
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
          map((data) => AuthActions.signUpWEmailAndPasswordSuccess({ data })),
          catchError((error) =>
            of(AuthActions.signUpWEmailAndPasswordFailure({ error }))
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
    private readonly authService: AuthService
  ) {}
}
