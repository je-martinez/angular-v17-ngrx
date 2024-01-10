import { Component, OnInit } from '@angular/core';
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
export class SignUpFormComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.user$.subscribe((data) => {
      console.log(data);
    });
  }

  public onGoogleSignUp() {
    this.authFacade.loginWGoogle();
  }
}
