import { NgModule } from '@angular/core';
import { SignUpOrLoginPageComponent } from './sign-up-or-login-page.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [SignUpOrLoginPageComponent],
  imports: [SignUpFormComponent, LoginFormComponent],
  exports: [SignUpOrLoginPageComponent],
})
export class SignUpOrLoginPageModule {}
