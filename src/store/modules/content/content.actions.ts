import {
  Post,
  PostComment,
  User
} from '@modules/home/types/content-wall.types';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ContentActions = createActionGroup({
  source: 'Content',
  events: {
    //Posts
    'Get Posts': emptyProps(),
    'Get Posts Success': props<{ data: Post[] }>(),
    'Get Posts Failure': props<{ error: Error | string }>(),
    //Comments
    'Get Comments': emptyProps(),
    'Get Comments Success': props<{ data: PostComment[] }>(),
    'Get Comments Failure': props<{ error: Error | string }>(),
    //Users
    'Get Users': emptyProps(),
    'Get Users Success': props<{ data: User[] }>(),
    'Get Users Failure': props<{ error: Error | string }>(),
    //Get Content By Id
    'Get Content By Id': props<{ data: number }>(),
    'Clear Content Id': emptyProps()
  }
});
