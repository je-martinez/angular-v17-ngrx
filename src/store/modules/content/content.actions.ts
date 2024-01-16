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
    'Get Posts Failure': props<{ error: Error }>(),
    //Comments
    'Get Comments': emptyProps(),
    'Get Comments Success': props<{ data: PostComment[] }>(),
    'Get Comments Failure': props<{ error: Error }>(),
    //Users
    'Get Users': emptyProps(),
    'Get Users Success': props<{ data: User[] }>(),
    'Get Users Failure': props<{ error: Error }>()
  }
});
