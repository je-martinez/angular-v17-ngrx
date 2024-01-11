import { User } from '@angular/fire/auth';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { SignUpForm } from 'src/auth/types/auth.DTOs';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    //Sign In w/ Google
    'SignUp w Google': emptyProps(),
    'SignUp w Google Success': props<{ data: User }>(),
    'SignUp w Google Failure': props<{ error: Error }>(),
    //Recover User From Storage
    'Recover User From Storage': emptyProps(),
    'Recover User From Storage Success': props<{ data: User }>(),
    'Recover User From Storage Failure': emptyProps(),
    //Sign In w/ Email and Password
    'SignUp w Email And Password': props<{ input: SignUpForm }>(),
    'SignUp w Email And Password Success': props<{ data: User }>(),
    'SignUp w Email And Password Failure': props<{ error: Error }>()
  }
});
