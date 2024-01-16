import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContent from './content.reducer';

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
