import { User } from '@angular/fire/auth';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'SignIn w Google': emptyProps(),
    'SignIn w Google Success': props<{ data: User }>(),
    'SignIn w Google Failure': props<{ error: Error }>(),
    'Recover User From Storage': emptyProps(),
    'Recover User From Storage Success': props<{ data: User }>(),
    'Recover User From Storage Failure': emptyProps(),
  },
});
