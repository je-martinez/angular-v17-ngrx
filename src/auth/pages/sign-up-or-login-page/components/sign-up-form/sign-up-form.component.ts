import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PASSWORD_REGEX } from 'src/auth/constants/auth.constants';
import { AuthFacade } from 'src/store/modules/auth/auth.facade';
import { AuthStoreModule } from 'src/store/modules/auth/auth.store.module';

@Component({
  selector: 'sign-up-form',
  standalone: true,
  imports: [
    RouterModule,
    AuthStoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  public readonly signUpForm: FormGroup | undefined;
  constructor(
    private authFacade: AuthFacade,
    private fb: FormBuilder
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required],
        [Validators.pattern(PASSWORD_REGEX)]
      ]
    });
  }

  public get password() {
    return this.signUpForm?.get('password')?.value;
  }

  public get formValue() {
    return this.signUpForm?.value;
  }

  public get isFormValid() {
    return this.signUpForm?.valid;
  }

  public getErrorsFromPassword() {
    const errors = [];

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

    return errors.length === 0 ? undefined : errors;
  }

  public onGoogleSignUp() {
    this.authFacade.signUpWGoogle();
  }

  public onEmailAndPasswordSignUp() {
    if (this.isFormValid) {
    }
  }
}
