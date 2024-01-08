import { Component } from '@angular/core';
import { AuthInitialPageMode } from '../types/auth.enums';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sign-up-or-login-page',
  templateUrl: './sign-up-or-login-page.component.html',
  styleUrl: './sign-up-or-login-page.component.scss',
})
export class SignUpOrLoginPageComponent {
  public mode: AuthInitialPageMode | undefined = undefined;

  constructor(private readonly route: ActivatedRoute) {
    this.mode = this.route.snapshot.data['mode'];
  }

  public get signInMode() {
    return AuthInitialPageMode.SIGN_UP;
  }
  public get loginMode() {
    return AuthInitialPageMode.LOGIN;
  }
}
