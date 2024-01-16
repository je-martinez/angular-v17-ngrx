import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignUpOrLoginErrorForm } from '@modules/auth/types/auth.types';
import { FormErrorMessageComponent } from '@shared/ui/components/form-error-message/form-error-message.component';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgClass,
    NgIf,
    FormErrorMessageComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Input() public loginForm: FormGroup | undefined;
  @Input() public emailErrors: SignUpOrLoginErrorForm[] = [];
  @Input() public passwordErrors: SignUpOrLoginErrorForm[] = [];
  @Output() public loginWithEmailAndPassword = new EventEmitter();
  @Output() public googleSignIn = new EventEmitter();
  @Output() public githubSignUp = new EventEmitter();

  public get emailInputHasErrors() {
    return this.emailErrors?.length > 0;
  }

  public get passwordInputHasErrors() {
    return this.passwordErrors?.length > 0;
  }

  public onSubmit() {
    this.loginWithEmailAndPassword.emit();
  }

  public onGoogleSignIn() {
    this.googleSignIn.emit();
  }

  public onGithubSignIn() {
    this.githubSignUp.emit();
  }
}
