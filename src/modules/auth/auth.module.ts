import { NgModule } from '@angular/core';
import { SignUpOrLoginPageModule } from './pages/sign-up-or-login-page/sign-up-or-login-page.module';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthLayoutModule } from '@layouts/auth/auth.layout.module';

@NgModule({
  imports: [AuthLayoutModule, AuthRoutingModule, SignUpOrLoginPageModule]
})
export class AuthModule {}
