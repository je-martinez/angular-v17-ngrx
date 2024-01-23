import { createAuthState } from '@mocks/store/state.mock';
import { selectAuthState, selectUser } from './auth.selectors';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const state = createAuthState();
    const result = selectAuthState(state);
    expect(result).toEqual(state.auth);
  });

  it('should select the current user from state', () => {
    const state = createAuthState();
    const result = selectUser(state);
    expect(result).toEqual(state.auth.user);
  });
});
