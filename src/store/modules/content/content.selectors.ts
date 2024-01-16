import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromContent from './content.reducer';

export const selectContentState =
  createFeatureSelector<fromContent.ContentState>(
    fromContent.contentFeatureKey
  );
