import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  @Input() public signUpForm: FormGroup | undefined;
  @Input() public emailErrors: string[] = [];
  @Input() public passwordErrors: string[] = [];
  @Output() public signUpWithEmailAndPassword = new EventEmitter();
  @Output() public googleSignUp = new EventEmitter();
}
