import { createFeature, createReducer, on } from '@ngrx/store';
import { ContentActions } from './content.actions';
import {
  Post,
  PostComment,
  User
} from '@modules/home/types/content-wall.types';
import { AuthActions } from '../auth/auth.actions';

export const contentFeatureKey = 'content';

export interface ContentState {
  posts: Post[];
  loadingGetPosts: boolean;
  errorGetPosts: Error | undefined;
  comments: PostComment[];
  loadingGetComments: boolean;
  errorGetComments: Error | undefined;
  users: User[];
  loadingGetUsers: boolean;
  errorGetUsers: Error | undefined;
}

export const initialState: ContentState = {
  posts: [],
  loadingGetPosts: false,
  errorGetPosts: undefined,
  comments: [],
  loadingGetComments: false,
  errorGetComments: undefined,
  users: [],
  loadingGetUsers: false,
  errorGetUsers: undefined
};

export const reducer = createReducer(
  initialState,
  //Get Posts
  on(
    ContentActions.getPosts,
    (state): ContentState => ({ ...state, loadingGetPosts: true })
  ),
  on(
    ContentActions.getPostsSuccess,
    (state, action): ContentState => ({
      ...state,
      loadingGetPosts: false,
      posts: action.data
    })
  ),
  on(
    ContentActions.getPostsFailure,
    (state, action): ContentState => ({
      ...state,
      loadingGetPosts: false,
      errorGetPosts: action.error
    })
  ),
  //Get Comments
  on(
    ContentActions.getComments,
    (state): ContentState => ({ ...state, loadingGetComments: true })
  ),
  on(
    ContentActions.getCommentsSuccess,
    (state, action): ContentState => ({
      ...state,
      loadingGetComments: false,
      comments: action.data
    })
  ),
  on(
    ContentActions.getCommentsFailure,
    (state, action): ContentState => ({
      ...state,
      loadingGetComments: false,
      errorGetComments: action.error
    })
  ),
  //Get Users
  on(
    ContentActions.getUsers,
    (state): ContentState => ({ ...state, loadingGetUsers: true })
  ),
  on(
    ContentActions.getUsersSuccess,
    (state, action): ContentState => ({
      ...state,
      loadingGetUsers: false,
      users: action.data
    })
  ),
  on(
    ContentActions.getUsersFailure,
    (state, action): ContentState => ({
      ...state,
      loadingGetUsers: false,
      errorGetUsers: action.error
    })
  ),
  on(
    AuthActions.signOutSuccess,
    (state): ContentState => ({
      ...state,
      ...initialState
    })
  ),
  on(
    AuthActions.signOutFailure,
    (state): ContentState => ({
      ...state,
      ...initialState
    })
  )
);

export const contentFeature = createFeature({
  name: contentFeatureKey,
  reducer
});
