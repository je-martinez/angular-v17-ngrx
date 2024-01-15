import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SignUpOrLoginErrorForm } from 'src/modules/auth/types';
import { ToastService } from 'src/shared/services/toast.service';
import { FormErrorMessageComponent } from 'src/shared/ui/components/form-error-message/form-error-message.component';

@Component({
  selector: 'sign-up-form',
  standalone: true,
  imports: [
    FormErrorMessageComponent,
    NgIf,
    NgFor,
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [ToastService],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent {
  @Input() public signUpForm: FormGroup | undefined;
  @Input() public emailErrors: SignUpOrLoginErrorForm[] = [];
  @Input() public passwordErrors: SignUpOrLoginErrorForm[] = [];
  @Output() public signUpWithEmailAndPassword = new EventEmitter();
  @Output() public googleSignUp = new EventEmitter();

  public get emailInputHasErrors() {
    return this.emailErrors?.length > 0;
  }

  public get passwordInputHasErrors() {
    return this.passwordErrors?.length > 0;
  }

  public onSubmit() {
    this.signUpWithEmailAndPassword.emit();
  }

  public onGoogleSignUp() {
    this.googleSignUp.emit();
  }
}
