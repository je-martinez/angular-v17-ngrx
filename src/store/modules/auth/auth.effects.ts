import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../../auth/services/auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  loginWGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginWGoogle),
      exhaustMap(() =>
        this.authService.loginWithGoogle().pipe(
          tap({
            next: (data) => this.authService.saveUserOnLocalStorage(data),
          }),
          map((data) => AuthActions.loginWGoogleSuccess({ data })),
          catchError((error) => of(AuthActions.loginWGoogleFailure({ error })))
        )
      )
    );
  });

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
          catchError((_) => of(AuthActions.recoverUserFromStorageFailure()))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly authService: AuthService
  ) {}
}
