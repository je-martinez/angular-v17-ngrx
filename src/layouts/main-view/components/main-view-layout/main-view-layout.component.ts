import { Component, ElementRef, ViewChild } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { Drawer } from 'flowbite';

@Component({
  selector: 'main-view-layout',
  templateUrl: './main-view-layout.component.html',
  styleUrl: './main-view-layout.component.scss'
})
@Flowbite()
export class MainViewLayoutComponent {
  @ViewChild('mobileSideBarBtn', { static: false })
  public mobileSideBarBtn: ElementRef<HTMLButtonElement> | undefined =
    undefined;
  constructor(private readonly authFacade: AuthFacade) {}

  public get user() {
    return this.authFacade.user$;
  }

  signOut() {
    const $targetEl = document.getElementById('default-sidebar');
    if ($targetEl) {
      const instanceOptions = {
        id: 'default-sidebar',
        override: true
      };
      const drawer = new Drawer($targetEl, {}, instanceOptions);
      drawer.hide();
    }
    this.authFacade.signOut();
  }
}
