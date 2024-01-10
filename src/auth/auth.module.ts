import { NgModule } from '@angular/core';
import { SignUpOrLoginPageModule } from './pages/sign-up-or-login-page/sign-up-or-login-page.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [SignUpOrLoginPageModule, AuthRoutingModule],
  exports: [SignUpOrLoginPageModule],
})
export class AuthModule {}
