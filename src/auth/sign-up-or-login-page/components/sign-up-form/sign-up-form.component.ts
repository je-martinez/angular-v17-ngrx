import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'sign-up-form',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  constructor() {}

  public onGoogleSignUp() {}
}
