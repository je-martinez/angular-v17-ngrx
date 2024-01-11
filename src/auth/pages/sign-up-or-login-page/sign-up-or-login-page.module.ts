import { NgModule } from '@angular/core';
import { SignUpOrLoginPageComponent } from './sign-up-or-login-page.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthStoreModule } from 'src/store/modules/auth/auth.store.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SignUpOrLoginPageComponent],
  imports: [
    SignUpFormComponent,
    LoginFormComponent,
    AuthStoreModule,
    CommonModule
  ],
  exports: [SignUpOrLoginPageComponent]
})
export class SignUpOrLoginPageModule {}
