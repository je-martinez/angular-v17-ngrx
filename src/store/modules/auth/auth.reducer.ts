import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '@angular/fire/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined;
  onErrorSignInWithGoogle: Error | undefined;
}

export const initialState: AuthState = {
  user: undefined,
  onErrorSignInWithGoogle: undefined,
};

export const reducer = createReducer(
  initialState,
  //Login w/ Google
  on(AuthActions.signInWGoogle, (state) => state),
  on(AuthActions.signInWGoogleSuccess, (state, action) => ({
    ...state,
    user: action.data,
  })),
  on(AuthActions.signInWGoogleFailure, (state, action) => ({
    ...state,
    onErrorSignInWithGoogle: { ...action.error },
  })),
  //Recover User From Storage
  on(AuthActions.recoverUserFromStorage, (state) => state),
  on(AuthActions.recoverUserFromStorageSuccess, (state, action) => ({
    ...state,
    user: action.data,
  })),
  on(AuthActions.recoverUserFromStorageFailure, (state) => ({
    ...state,
    user: undefined,
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
