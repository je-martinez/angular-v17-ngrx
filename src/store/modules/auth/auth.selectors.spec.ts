import { createRootState } from '@mocks/store/state.mock';
import { selectAuthState, selectUser } from './auth.selectors';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const state = createRootState();
    const result = selectAuthState(state);
    expect(result).toEqual(state.auth);
  });

  it('should select the current user from state', () => {
    const state = createRootState();
    const result = selectUser(state);
    expect(result).toEqual(state.auth.user);
  });
});
