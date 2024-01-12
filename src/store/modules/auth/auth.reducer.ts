import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '@angular/fire/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined;
  loadingSignInWithGoogle: boolean;
  onErrorSignInWithGoogle: Error | undefined;
  loadingSignUpWithEmailAndPassword: boolean;
  onErrorSignUpWithEmailAndPassword: Error | undefined;
  loadingSignInWithEmailAndPassword: boolean;
  onErrorSignInWithEmailAndPassword: Error | undefined;
  loadingSignOut: boolean;
}

export const initialState: AuthState = {
  user: undefined,
  loadingSignInWithGoogle: false,
  onErrorSignInWithGoogle: undefined,
  loadingSignUpWithEmailAndPassword: false,
  onErrorSignUpWithEmailAndPassword: undefined,
  loadingSignInWithEmailAndPassword: false,
  onErrorSignInWithEmailAndPassword: undefined,
  loadingSignOut: false
};

export const reducer = createReducer(
  initialState,
  //Sign In w/ Google
  on(
    AuthActions.signInWGoogle,
    (state): AuthState => ({
      ...state,
      loadingSignInWithGoogle: true
    })
  ),
  on(
    AuthActions.signInWGoogleSuccess,
    (state, action): AuthState => ({
      ...state,
      loadingSignInWithGoogle: false,
      user: action.data
    })
  ),
  on(
    AuthActions.signInWGoogleFailure,
    (state, action): AuthState => ({
      ...state,
      loadingSignInWithGoogle: false,
      onErrorSignInWithGoogle: { ...action.error }
    })
  ),

  //Sign Up w/ Email and Password
  on(
    AuthActions.signUpWEmailAndPassword,
    (state): AuthState => ({
      ...state,
      loadingSignUpWithEmailAndPassword: true
    })
  ),
  on(
    AuthActions.signUpWEmailAndPasswordSuccess,
    (state, action): AuthState => ({
      ...state,
      user: action.data,
      loadingSignUpWithEmailAndPassword: false
    })
  ),
  on(
    AuthActions.signUpWEmailAndPasswordFailure,
    (state): AuthState => ({
      ...state,
      loadingSignUpWithEmailAndPassword: false
    })
  ),

  //Sign In w/ Email and Password
  on(
    AuthActions.signInWEmailAndPassword,
    (state): AuthState => ({
      ...state,
      loadingSignInWithEmailAndPassword: true
    })
  ),
  on(
    AuthActions.signInWEmailAndPasswordSuccess,
    (state, action): AuthState => ({
      ...state,
      user: action.data,
      loadingSignInWithEmailAndPassword: false
    })
  ),
  on(
    AuthActions.signInWEmailAndPasswordFailure,
    (state): AuthState => ({
      ...state,
      loadingSignInWithEmailAndPassword: false
    })
  ),

  //Sign Out
  on(
    AuthActions.signOut,
    (state): AuthState => ({
      ...state,
      loadingSignOut: true
    })
  ),
  on(
    AuthActions.signOutSuccess,
    (state): AuthState => ({
      ...state,
      user: undefined,
      loadingSignOut: false
    })
  ),
  on(
    AuthActions.signOutFailure,
    (state): AuthState => ({
      ...state,
      user: undefined,
      loadingSignOut: false
    })
  ),

  //Recover User From Storage
  on(AuthActions.recoverUserFromStorage, (state): AuthState => state),
  on(
    AuthActions.recoverUserFromStorageSuccess,
    (state, action): AuthState => ({
      ...state,
      user: action.data
    })
  ),
  on(
    AuthActions.recoverUserFromStorageFailure,
    (state): AuthState => ({
      ...state,
      user: undefined
    })
  )
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer
});
