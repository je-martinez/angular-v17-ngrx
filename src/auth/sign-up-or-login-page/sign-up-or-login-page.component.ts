import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthInitialPageMode } from '../types/auth.enums';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/store/modules/auth/auth.reducer';
import { AuthActions } from 'src/store/modules/auth/auth.actions';

@Component({
  selector: 'sign-up-or-login-page',
  templateUrl: './sign-up-or-login-page.component.html',
  styleUrl: './sign-up-or-login-page.component.scss',
})
export class SignUpOrLoginPageComponent implements OnInit, OnDestroy {
  public mode: AuthInitialPageMode | undefined = undefined;
  private readonly unsubscribe$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AuthState>
  ) {
    this.mode = this.route.snapshot.data['mode'];
  }

  ngOnInit(): void {
    this.store.subscribe((state) => {
      console.log(state);
    });
    this.store.dispatch(AuthActions.loginWGoogle());
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
