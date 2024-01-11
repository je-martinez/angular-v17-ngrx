import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '@angular/fire/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined;
  loadingSignUpWithGoogle: boolean;
  onErrorsignUpWithGoogle: Error | undefined;
  loadingSignUpWithEmailAndPassword: boolean;
  onErrorSignUpWithEmailAndPassword: Error | undefined;
}

export const initialState: AuthState = {
  user: undefined,
  loadingSignUpWithGoogle: false,
  onErrorsignUpWithGoogle: undefined,
  loadingSignUpWithEmailAndPassword: false,
  onErrorSignUpWithEmailAndPassword: undefined
};

export const reducer = createReducer(
  initialState,
  //Sign Up w/ Google
  on(AuthActions.signUpWGoogle, (state) => ({
    ...state,
    loadingsignUpWithGoogle: true
  })),
  on(AuthActions.signUpWGoogleSuccess, (state, action) => ({
    ...state,
    loadingsignUpWithGoogle: false,
    user: action.data
  })),
  on(AuthActions.signUpWGoogleFailure, (state, action) => ({
    ...state,
    loadingsignUpWithGoogle: false,
    onErrorsignUpWithGoogle: { ...action.error }
  })),

  //Sign Up w/ Email and Password
  on(AuthActions.signUpWEmailAndPassword, (state) => ({
    ...state,
    loadingSignUpWithEmailAndPassword: true
  })),
  on(AuthActions.signUpWEmailAndPasswordSuccess, (state, action) => ({
    ...state,
    user: action.data,
    loadingSignUpWithEmailAndPassword: false
  })),
  on(AuthActions.signUpWEmailAndPasswordFailure, (state) => ({
    ...state,
    loadingSignUpWithEmailAndPassword: false
  })),

  //Recover User From Storage
  on(AuthActions.recoverUserFromStorage, (state) => state),
  on(AuthActions.recoverUserFromStorageSuccess, (state, action) => ({
    ...state,
    user: action.data
  })),
  on(AuthActions.recoverUserFromStorageFailure, (state) => ({
    ...state,
    user: undefined
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer
});
