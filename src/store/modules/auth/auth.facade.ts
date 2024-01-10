import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AuthActions } from './auth.actions';
import { selectAuthState } from './auth.selectors';

@Injectable()
export class AuthFacade {
  public readonly userCredentials = selectAuthState(this.store)
    .userCrendentials;

  constructor(private store: Store<AuthState>) {}
  loginWGoogle() {
    this.store.dispatch(AuthActions.loginWGoogle());
  }
}
