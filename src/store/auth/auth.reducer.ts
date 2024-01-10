import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { UserCredential } from '@angular/fire/auth';

export const authFeatureKey = 'auth';

export interface State {
  userCrendentials: UserCredential | undefined;
  onErrorLoginWithGoogle: Error | undefined;
}

export const initialState: State = {
  userCrendentials: undefined,
  onErrorLoginWithGoogle: undefined,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loadAuths, (state) => state),
  on(AuthActions.loadAuthsSuccess, (state, action) => ({
    ...state,
    userCrendentials: action.data,
  })),
  on(AuthActions.loadAuthsFailure, (state, action) => ({
    ...state,
    onErrorLoginWithGoogle: action.error,
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});
