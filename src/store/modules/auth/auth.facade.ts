import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { RootState } from 'src/store';
import { selectUser } from './auth.selectors';

@Injectable()
export class AuthFacade {
  public readonly user$ = this.store.select(selectUser);

  constructor(private store: Store<RootState>) {}
  signUpWGoogle() {
    this.store.dispatch(AuthActions.signUpWGoogle());
  }

  recoveUserFromStorage() {
    this.store.dispatch(AuthActions.recoverUserFromStorage());
  }
}
