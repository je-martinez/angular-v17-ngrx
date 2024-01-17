import { Component } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { AuthFacade } from '@store/modules/auth/auth.facade';

@Component({
  selector: 'main-view-layout',
  templateUrl: './main-view-layout.component.html',
  styleUrl: './main-view-layout.component.scss'
})
@Flowbite()
export class MainViewLayoutComponent {
  constructor(private readonly authFacade: AuthFacade) {}

  public get user() {
    return this.authFacade.user$;
  }

  signOut() {
    this.authFacade.signOut();
  }
}
