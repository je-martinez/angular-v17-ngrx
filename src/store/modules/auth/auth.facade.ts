import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { selectUser } from './auth.selectors';
import { SignUpOrLoginFormDTO } from '@modules/auth/types/auth.DTOs';
import { RootState } from '../types/store.types';

@Injectable()
export class AuthFacade {
  public readonly user$ = this.store.select(selectUser);

  constructor(private store: Store<RootState>) {}
  signInWGoogle() {
    this.store.dispatch(AuthActions.signInWGoogle());
  }

  signInWGithub() {
    this.store.dispatch(AuthActions.signInWGithub());
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
