import { mockComments } from '@mocks/data/comments.mock';
import { mockPosts } from '@mocks/data/posts.mock';
import { mockLoggedUser, mockUsers } from '@mocks/data/users.mock';
import {
  AuthState,
  initialState as AuthInitialState
} from '@store/modules/auth/auth.reducer';
import {
  ContentState,
  initialState as ContentInitialState
} from '@store/modules/content/content.reducer';
import { RootState } from '@store/modules/types/store.types';

export const createRootState = (): RootState => ({
  auth: {
    ...AuthInitialState,
    user: mockLoggedUser
  } as AuthState,
  content: {
    ...ContentInitialState,
    posts: [...mockPosts],
    users: [...mockUsers],
    comments: [...mockComments],
    contentId: mockPosts[0].id
  } as ContentState
});
