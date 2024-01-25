import { generateMockStore } from '@mocks/store/store.mock';
import { reducer, initialState, ContentState } from './content.reducer';
import { createMockRootState } from '@mocks/store/state.mock';
import { ContentActions } from './content.actions';

describe('Content Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });
  describe('an known action', () => {
    it('should return desired state on getPosts action', () => {
      const desiredState: ContentState = {
        ...initialState,
        loadingGetPosts: true
      };
      const action = ContentActions.getPosts();
      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });
  });
});
