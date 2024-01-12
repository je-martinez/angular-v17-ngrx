import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { RootState } from 'src/store';
import { selectUser } from './auth.selectors';
import { SignUpOrLoginFormDTO } from 'src/auth/types/auth.DTOs';

@Injectable()
export class AuthFacade {
  public readonly user$ = this.store.select(selectUser);

  constructor(private store: Store<RootState>) {}
  signInWGoogle() {
    this.store.dispatch(AuthActions.signInWGoogle());
  }

  signUpWEmailAndPassword(input: SignUpOrLoginFormDTO) {
    this.store.dispatch(AuthActions.signUpWEmailAndPassword({ input }));
  }

  signInWEmailAndPassword(input: SignUpOrLoginFormDTO) {
    this.store.dispatch(AuthActions.signInWEmailAndPassword({ input }));
  }

  signOut() {
    this.store.dispatch(AuthActions.signOut());
  }

  recoveUserFromStorage() {
    this.store.dispatch(AuthActions.recoverUserFromStorage());
  }
}
