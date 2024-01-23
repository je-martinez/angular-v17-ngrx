import { mockLoggedUser } from '@mocks/data/users.mock';
import {
  AuthState,
  initialState as AuthInitialState
} from '@store/modules/auth/auth.reducer';
import { RootState } from '@store/modules/types/store.types';

export const createAuthState = (): RootState => ({
  auth: {
    ...AuthInitialState,
    user: mockLoggedUser
  } as AuthState
});
