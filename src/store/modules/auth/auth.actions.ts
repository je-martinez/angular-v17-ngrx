import { User } from '@angular/fire/auth';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SignUpFormDTO } from 'src/auth/types/auth.DTOs';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    //Sign In w/ Google
    'Sign In w Google': emptyProps(),
    'Sign In w Google Success': props<{ data: User }>(),
    'Sign In w Google Failure': props<{ error: Error }>(),
    //Recover User From Storage
    'Recover User From Storage': emptyProps(),
    'Recover User From Storage Success': props<{ data: User }>(),
    'Recover User From Storage Failure': emptyProps(),
    //Sign In w/ Email and Password
    'Sign Up w Email And Password': props<{ input: SignUpFormDTO }>(),
    'Sign Up w Email And Password Success': props<{ data: User }>(),
    'Sign Up w Email And Password Failure': props<{ error: Error }>()
  }
});
