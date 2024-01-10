import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';
import { AuthService } from '../../auth/services/auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  loadAuths$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginWGoogle),
      concatMap(() =>
        this.authService.loginWithGoogle().pipe(
          map((data) => AuthActions.loginWGoogleSuccess({ data })),
          catchError((error) => of(AuthActions.loginWGoogleFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly authService: AuthService
  ) {}
}
