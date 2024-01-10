import { Component, OnDestroy } from '@angular/core';
import { AuthInitialPageMode } from '../types/auth.enums';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'sign-up-or-login-page',
  templateUrl: './sign-up-or-login-page.component.html',
  styleUrl: './sign-up-or-login-page.component.scss',
})
export class SignUpOrLoginPageComponent implements OnDestroy {
  public mode: AuthInitialPageMode | undefined = undefined;
  private readonly unsubscribe$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute) {
    this.mode = this.route.snapshot.data['mode'];
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public get signInMode() {
    return AuthInitialPageMode.SIGN_UP;
  }

  public get loginMode() {
    return AuthInitialPageMode.LOGIN;
  }
}
