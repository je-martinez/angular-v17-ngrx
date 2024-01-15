import { Component } from '@angular/core';
import { AuthFacade } from '@store/modules/auth/auth.facade';

@Component({
  selector: 'main-view-layout',
  templateUrl: './main-view-layout.component.html',
  styleUrl: './main-view-layout.component.scss'
})
export class MainViewLayoutComponent {
  constructor(private readonly authFacade: AuthFacade) {}

  signOut() {
    this.authFacade.signOut();
  }
}
