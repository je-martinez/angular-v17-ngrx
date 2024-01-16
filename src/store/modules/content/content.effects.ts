import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ContentActions } from './content.actions';
import { ContentService } from '@modules/home/services/content.service';

@Injectable()
export class ContentEffects {
  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContentActions.getPosts),
      exhaustMap(() =>
        this.contentService.getPostsFromApi().pipe(
          map((data) => ContentActions.getPostsSuccess({ data })),
          catchError((error) => of(ContentActions.getPostsFailure({ error })))
        )
      )
    );
  });

  getComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContentActions.getComments),
      exhaustMap(() =>
        this.contentService.getCommentsFromApi().pipe(
          map((data) => ContentActions.getCommentsSuccess({ data })),
          catchError((error) =>
            of(ContentActions.getCommentsFailure({ error }))
          )
        )
      )
    );
  });

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContentActions.getUsers),
      exhaustMap(() =>
        this.contentService.getUsersFromApi().pipe(
          map((data) => ContentActions.getUsersSuccess({ data })),
          catchError((error) => of(ContentActions.getUsersFailure({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly contentService: ContentService
  ) {}
}
