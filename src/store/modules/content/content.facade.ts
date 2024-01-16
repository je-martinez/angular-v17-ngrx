import { Injectable } from '@angular/core';
import { RootState } from '../types/store.types';
import { Store } from '@ngrx/store';
import { ContentActions } from './content.actions';
import {
  selectComments,
  selectContent,
  selectLoadingGetComments,
  selectLoadingGetPosts,
  selectLoadingGetUsers,
  selectPosts,
  selectUsers
} from './content.selectors';

@Injectable({
  providedIn: 'root'
})
export class ContentFacade {
  public readonly loadingGetPosts$ = this.store.select(selectLoadingGetPosts);
  public readonly loadingGetComments$ = this.store.select(
    selectLoadingGetComments
  );
  public readonly loadingGetUsers$ = this.store.select(selectLoadingGetUsers);
  public readonly posts$ = this.store.select(selectPosts);
  public readonly comments$ = this.store.select(selectComments);
  public readonly users$ = this.store.select(selectUsers);
  public readonly content$ = this.store.select(selectContent);

  constructor(private store: Store<RootState>) {}

  getPosts() {
    this.store.dispatch(ContentActions.getPosts());
  }
  getComments() {
    this.store.dispatch(ContentActions.getComments());
  }
  getUsers() {
    this.store.dispatch(ContentActions.getUsers());
  }
}
