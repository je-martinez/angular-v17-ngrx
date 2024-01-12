import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthInitialPageMode } from '../../types/auth.enums';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { AuthFacade } from 'src/store/modules/auth/auth.facade';
import { PASSWORD_REGEX } from 'src/auth/constants/auth.constants';

@Component({
  selector: 'sign-up-or-login-page',
  templateUrl: './sign-up-or-login-page.component.html',
  styleUrl: './sign-up-or-login-page.component.scss'
})
export class SignUpOrLoginPageComponent {
  public mode: AuthInitialPageMode | undefined = undefined;
  public readonly signUpOrLoginForm: FormGroup | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authFacade: AuthFacade,
    private readonly fb: FormBuilder
  ) {
    this.mode = this.route.snapshot.data['mode'];
    this.signUpOrLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]]
    });
  }

  public get signUpMode() {
    return AuthInitialPageMode.SIGN_UP;
  }

  public get loginMode() {
    return AuthInitialPageMode.LOGIN;
  }

  public get password() {
    return this.signUpOrLoginForm?.get('password')?.value;
  }

  public get emailInputHasErrors() {
    return this.emailErrors?.length > 0;
  }

  private get wasEmailInputTouched() {
    return this.signUpOrLoginForm?.get('email')?.touched;
  }

  public get passwordInputHasErrors() {
    return this.passwordErrors?.length > 0;
  }

  private get wasPasswordInputTouched() {
    return this.signUpOrLoginForm?.get('password')?.touched;
  }

  public get formValue() {
    return this.signUpOrLoginForm?.value;
  }

  public get isFormValid() {
    return this.signUpOrLoginForm?.valid;
  }

  public get emailErrors() {
    if (!this.wasEmailInputTouched) {
      return [];
    }

    const errors: string[] = [];
    const emailControlErrors: ValidationErrors | null | undefined =
      this.signUpOrLoginForm?.get('email')?.errors;

    if (emailControlErrors?.['required']) {
      errors.push('This field is required.');
    }

    if (emailControlErrors?.['email']) {
      errors.push('Invalid email address.');
    }
    return errors;
  }

  public get passwordErrors() {
    if (!this.wasPasswordInputTouched) {
      return [];
    }

    const errors = [];

    const passwordControlErrors: ValidationErrors | null | undefined =
      this.signUpOrLoginForm?.get('password')?.errors;

    if (passwordControlErrors?.['required']) {
      errors.push('This field is required.');
    }

    if (!/(?=.*[A-Za-z])/.test(this.password)) {
      errors.push('It must contain at least one alphabetical character.');
    }

    if (!/(?=.*\d)/.test(this.password)) {
      errors.push('It must contain at least one digit.');
    }

    if (!/(?=.*[@$!%*?&])/.test(this.password)) {
      errors.push('It must contain at least one special character (@$!%*?&).');
    }

    if (this.password.length < 8) {
      errors.push('It must have a minimum length of 8 characters.');
    }

    return errors;
  }

  public onGoogleSignUp() {
    this.authFacade.signInWGoogle();
  }

  public onSubmit() {
    if (this.signUpOrLoginForm?.invalid) {
      return;
    }

    if (this.mode === AuthInitialPageMode.SIGN_UP) {
      this.authFacade.signInWEmailAndPassword(this.formValue);
    }
  }
}
