import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpOrLoginPageComponent } from './sign-up-or-login-page/sign-up-or-login-page.component';
import { AuthInitialPageMode } from './types/auth.enums';

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpOrLoginPageComponent,
    data: { mode: AuthInitialPageMode.SIGN_UP },
    title: 'Sign Up',
  },
  {
    path: 'login',
    component: SignUpOrLoginPageComponent,
    data: { mode: AuthInitialPageMode.LOGIN },
    title: 'Login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
