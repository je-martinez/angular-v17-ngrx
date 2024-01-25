import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';
import { ContentActions } from './content.actions';
import { ContentService } from '@modules/home/services/content.service';
import { NGXLogger } from 'ngx-logger';

const DELAY = 1500;

@Injectable()
export class ContentEffects {
  getPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContentActions.getPosts),
      debounceTime(DELAY),
      exhaustMap(() =>
        this.contentService.getPostsFromApi().pipe(
          map((data) => ContentActions.getPostsSuccess({ data })),
          catchError((error) => {
            this.logger.error({ error });
            return of(ContentActions.getPostsFailure({ error }));
          })
        )
      )
    );
  });

  getComments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContentActions.getComments),
      debounceTime(DELAY),
      exhaustMap(() =>
        this.contentService.getCommentsFromApi().pipe(
          map((data) => ContentActions.getCommentsSuccess({ data })),
          catchError((error) => {
            this.logger.error({ error });
            return of(ContentActions.getCommentsFailure({ error }));
          })
        )
      )
    );
  });

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContentActions.getUsers),
      debounceTime(DELAY),
      exhaustMap(() =>
        this.contentService.getUsersFromApi().pipe(
          map((data) => ContentActions.getUsersSuccess({ data })),
          catchError((error) => {
            this.logger.error({ error });
            return of(ContentActions.getUsersFailure({ error }));
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private readonly contentService: ContentService,
    private readonly logger: NGXLogger
  ) {}
}
