import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PASSWORD_REGEX } from 'src/auth/constants/auth.constants';
import { ToastService } from 'src/shared/services/toast.service';
import { FormErrorMessageComponent } from 'src/shared/ui/components/form-error-message/form-error-message.component';
import { AuthFacade } from 'src/store/modules/auth/auth.facade';
import { AuthStoreModule } from 'src/store/modules/auth/auth.store.module';

@Component({
  selector: 'sign-up-form',
  standalone: true,
  imports: [
    FormErrorMessageComponent,
    RouterModule,
    AuthStoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgFor,
    NgClass
  ],
  providers: [ToastService],
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
      password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]]
    });
  }

  public get password() {
    return this.signUpForm?.get('password')?.value;
  }

  public get emailInputHasErrors() {
    return this.emailErrors?.length > 0;
  }

  private get wasEmailInputTouched() {
    return this.signUpForm?.get('email')?.touched;
  }

  public get passwordInputHasErrors() {
    return this.passwordErrors?.length > 0;
  }

  private get wasPasswordInputTouched() {
    return this.signUpForm?.get('password')?.touched;
  }

  public get formValue() {
    return this.signUpForm?.value;
  }

  public get isFormValid() {
    return this.signUpForm?.valid;
  }

  public get emailErrors() {
    if (!this.wasEmailInputTouched) {
      return [];
    }

    const errors: string[] = [];
    const emailControlErrors: ValidationErrors | null | undefined =
      this.signUpForm?.get('email')?.errors;

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
      this.signUpForm?.get('password')?.errors;

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

  public onEmailAndPasswordSignUp() {
    if (this.isFormValid) {
      this.authFacade.signInWEmailAndPassword(this.formValue);
    }
  }
}
