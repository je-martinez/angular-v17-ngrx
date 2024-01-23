import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '@angular/fire/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | undefined;
  loadingSignInWithGoogle: boolean;
  onErrorSignInWithGoogle: Error | string | undefined;
  loadingSignInWithGithub: boolean;
  onErrorSignInWithGithub: Error | string | undefined;
  loadingSignUpWithEmailAndPassword: boolean;
  onErrorSignUpWithEmailAndPassword: Error | string | undefined;
  loadingSignInWithEmailAndPassword: boolean;
  onErrorSignInWithEmailAndPassword: Error | string | undefined;
  loadingSignOut: boolean;
}

export const initialState: AuthState = {
  user: undefined,
  loadingSignInWithGoogle: false,
  onErrorSignInWithGoogle: undefined,
  loadingSignInWithGithub: false,
  onErrorSignInWithGithub: undefined,
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
      onErrorSignInWithGoogle: action.error
    })
  ),

  //Sign In w/ Github
  on(
    AuthActions.signInWGithub,
    (state): AuthState => ({
      ...state,
      loadingSignInWithGithub: true
    })
  ),
  on(
    AuthActions.signInWGithubSuccess,
    (state, action): AuthState => ({
      ...state,
      loadingSignInWithGithub: false,
      user: action.data
    })
  ),
  on(
    AuthActions.signInWGithubFailure,
    (state, action): AuthState => ({
      ...state,
      loadingSignInWithGithub: false,
      onErrorSignInWithGithub: action.error
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
    (state, action): AuthState => ({
      ...state,
      onErrorSignUpWithEmailAndPassword: action.error,
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
    (state, action): AuthState => ({
      ...state,
      onErrorSignInWithEmailAndPassword: action.error,
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
      ...initialState
    })
  ),
  on(
    AuthActions.signOutFailure,
    (state): AuthState => ({
      ...state,
      ...initialState
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
