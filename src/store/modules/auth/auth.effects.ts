import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../../auth/services/auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  signInWGoogle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signInWGoogle),
      exhaustMap(() =>
        this.authService.signInWithGoogle().pipe(
          tap({
            next: (data) => this.authService.saveUserOnLocalStorage(data)
          }),
          map((data) => AuthActions.signInWGoogleSuccess({ data })),
          catchError((error) => of(AuthActions.signInWGoogleFailure({ error })))
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
