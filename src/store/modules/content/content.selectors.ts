import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContent from './content.reducer';
import { Content } from '@modules/home/types/content-wall.types';

export const selectContentState =
  createFeatureSelector<fromContent.ContentState>(
    fromContent.contentFeatureKey
  );

export const selectLoadingGetPosts = createSelector(
  selectContentState,
  (state: fromContent.ContentState) => state?.loadingGetPosts
);

export const selectLoadingGetComments = createSelector(
  selectContentState,
  (state: fromContent.ContentState) => state?.loadingGetComments
);

export const selectLoadingGetUsers = createSelector(
  selectContentState,
  (state: fromContent.ContentState) => state?.loadingGetUsers
);

export const selectPosts = createSelector(
  selectContentState,
  (state: fromContent.ContentState) => state?.posts
);

export const selectComments = createSelector(
  selectContentState,
  (state: fromContent.ContentState) => state?.comments
);

export const selectUsers = createSelector(
  selectContentState,
  (state: fromContent.ContentState) => state?.users
);

export const selectContent = createSelector(
  selectPosts,
  selectComments,
  selectUsers,
  (posts, comments, users) => {
    return posts
      ?.map((post) => {
        return {
          ...post,
          comments: comments?.filter((comment) => comment?.postId === post?.id),
          user: users.find((user) => user?.id === post?.userId)
        };
      })
      .sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      ) as Content[];
  }
);
