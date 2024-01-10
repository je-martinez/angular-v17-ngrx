import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '@angular/fire/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined;
  onErrorLoginWithGoogle: Error | undefined;
}

export const initialState: AuthState = {
  user: undefined,
  onErrorLoginWithGoogle: undefined,
};

export const reducer = createReducer(
  initialState,
  //Login w/ Google
  on(AuthActions.loginWGoogle, (state) => state),
  on(AuthActions.loginWGoogleSuccess, (state, action) => ({
    ...state,
    user: action.data,
  })),
  on(AuthActions.loginWGoogleFailure, (state, action) => ({
    ...state,
    onErrorLoginWithGoogle: { ...action.error },
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
