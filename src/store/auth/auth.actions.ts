import { UserCredential } from '@angular/fire/auth';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login w Google': emptyProps(),
    'Login w Google Success': props<{ data: UserCredential }>(),
    'Login w Google Failure': props<{ error: Error }>(),
  },
});
