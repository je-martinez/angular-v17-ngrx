import { createMockRootState } from '@mocks/store/state.mock';
import { selectAuthState, selectUser } from './auth.selectors';

describe('Auth Selectors', () => {
  it('should select the feature state', () => {
    const state = createMockRootState();
    const result = selectAuthState(state);
    expect(result).toEqual(state.auth);
  });

  it('should select the current user from state', () => {
    const state = createMockRootState();
    const result = selectUser(state);
    expect(result).toEqual(state.auth.user);
  });
});
