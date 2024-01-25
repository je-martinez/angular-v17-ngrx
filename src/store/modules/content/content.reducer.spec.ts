import { mockPosts } from '@mocks/data/posts.mock';
import { ContentActions } from './content.actions';
import { ContentState, initialState, reducer } from './content.reducer';
import { mockComments } from '@mocks/data/comments.mock';
import { mockUsers } from '@mocks/data/users.mock';
import { AuthActions } from '../auth/auth.actions';

describe('Content Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });
  describe('an known action', () => {
    it('should return desired state on get posts action', () => {
      const desiredState: ContentState = {
        ...initialState,
        loadingGetPosts: true
      };
      const action = ContentActions.getPosts();
      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return desired state on get posts success action', () => {
      const posts = [...mockPosts];
      const desiredState: ContentState = {
        ...initialState,
        posts,
        loadingGetPosts: false
      };
      const action = ContentActions.getPostsSuccess({ data: posts });
      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return desired state on get posts error action', () => {
      const err = new Error('Oops!');
      const desiredState: ContentState = {
        ...initialState,
        errorGetPosts: err.message,
        loadingGetPosts: false
      };
      const action = ContentActions.getPostsFailure({ error: err.message });
      const result = reducer(initialState, action);
      expect(result).toEqual(desiredState);
    });

    it('should return desired state on get comments action', () => {
      const desiredState: ContentState = {
        ...initialState,
        loadingGetComments: true
      };
      const action = ContentActions.getComments();
      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return desired state on get comments success action', () => {
      const comments = [...mockComments];
      const desiredState: ContentState = {
        ...initialState,
        comments,
        loadingGetComments: false
      };
      const action = ContentActions.getCommentsSuccess({ data: comments });
      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return desired state on get comments error action', () => {
      const err = new Error('Oops!');
      const desiredState: ContentState = {
        ...initialState,
        errorGetComments: err.message,
        loadingGetComments: false
      };
      const action = ContentActions.getCommentsFailure({ error: err.message });
      const result = reducer(initialState, action);
      expect(result).toEqual(desiredState);
    });

    it('should return desired state on get users action', () => {
      const desiredState: ContentState = {
        ...initialState,
        loadingGetUsers: true
      };
      const action = ContentActions.getUsers();
      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return desired state on get users success action', () => {
      const users = [...mockUsers];
      const desiredState: ContentState = {
        ...initialState,
        users,
        loadingGetUsers: false
      };
      const action = ContentActions.getUsersSuccess({ data: users });
      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return desired state on get users error action', () => {
      const err = new Error('Oops!');
      const desiredState: ContentState = {
        ...initialState,
        errorGetUsers: err.message,
        loadingGetUsers: false
      };
      const action = ContentActions.getUsersFailure({ error: err.message });
      const result = reducer(initialState, action);
      expect(result).toEqual(desiredState);
    });

    it('should return desired state on select content by id action', () => {
      const contentId = mockPosts[0].id;
      const desiredState: ContentState = {
        ...initialState,
        contentId
      };
      const action = ContentActions.getContentById({ data: contentId });
      const result = reducer(initialState, action);
      expect(result).toEqual(desiredState);
    });

    it('should return desired state on clear select content by id action', () => {
      const desiredState: ContentState = {
        ...initialState,
        contentId: undefined
      };
      const action = ContentActions.clearContentId();
      const result = reducer(initialState, action);
      expect(result).toEqual(desiredState);
    });

    it('should return desired state on clear state on sign out success action', () => {
      const desiredState: ContentState = {
        ...initialState
      };
      const action = AuthActions.signOutSuccess();
      const result = reducer(initialState, action);
      expect(result).toEqual(desiredState);
    });

    it('should return desired state on clear state on sign out success action', () => {
      const desiredState: ContentState = {
        ...initialState
      };
      const action = AuthActions.signOutFailure();
      const result = reducer(initialState, action);
      expect(result).toEqual(desiredState);
    });
  });
});
