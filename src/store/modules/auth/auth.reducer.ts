import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { UserCredential } from '@angular/fire/auth';

export const authFeatureKey = 'auth';

export interface AuthState {
  userCrendentials: UserCredential | undefined;
  onErrorLoginWithGoogle: Error | undefined;
}

export const initialState: AuthState = {
  userCrendentials: undefined,
  onErrorLoginWithGoogle: undefined,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginWGoogle, (state) => state),
  on(AuthActions.loginWGoogleSuccess, (state, action) => ({
    ...state,
    userCrendentials: { ...action.data },
  })),
  on(AuthActions.loginWGoogleFailure, (state, action) => ({
    ...state,
    onErrorLoginWithGoogle: { ...action.error },
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
