import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthFacade } from 'src/store/modules/auth/auth.facade';
import { AuthStoreModule } from 'src/store/modules/auth/auth.store.module';

@Component({
  selector: 'sign-up-form',
  standalone: true,
  imports: [RouterModule, AuthStoreModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  constructor(private authFacade: AuthFacade) {}

  public onGoogleSignUp() {
    this.authFacade.loginWGoogle();
  }
}
