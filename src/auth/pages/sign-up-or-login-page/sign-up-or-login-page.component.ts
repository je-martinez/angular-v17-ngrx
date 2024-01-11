import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthInitialPageMode } from '../../types/auth.enums';

@Component({
  selector: 'sign-up-or-login-page',
  templateUrl: './sign-up-or-login-page.component.html',
  styleUrl: './sign-up-or-login-page.component.scss'
})
export class SignUpOrLoginPageComponent implements OnInit, OnDestroy {
  public mode: AuthInitialPageMode | undefined = undefined;

  constructor(private readonly route: ActivatedRoute) {
    this.mode = this.route.snapshot.data['mode'];
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public get signUpMode() {
    return AuthInitialPageMode.SIGN_UP;
  }

  public get loginMode() {
    return AuthInitialPageMode.LOGIN;
  }
}
