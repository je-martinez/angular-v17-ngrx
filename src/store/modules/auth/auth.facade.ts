import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { RootState } from 'src/store';
import { selectUser } from './auth.selectors';
import { SignUpFormDTO } from 'src/auth/types/auth.DTOs';

@Injectable()
export class AuthFacade {
  public readonly user$ = this.store.select(selectUser);

  constructor(private store: Store<RootState>) {}
  signInWGoogle() {
    this.store.dispatch(AuthActions.signInWGoogle());
  }

  signInWEmailAndPassword(input: SignUpFormDTO) {
    this.store.dispatch(AuthActions.signUpWEmailAndPassword({ input }));
  }
  recoveUserFromStorage() {
    this.store.dispatch(AuthActions.recoverUserFromStorage());
  }
}
