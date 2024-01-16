import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ContentActions } from './content.actions';


@Injectable()
export class ContentEffects {

  loadContents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ContentActions.loadContents),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ContentActions.loadContentsSuccess({ data })),
          catchError(error => of(ContentActions.loadContentsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
