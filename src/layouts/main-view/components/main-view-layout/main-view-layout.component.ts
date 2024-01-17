import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { AuthFacade } from '@store/modules/auth/auth.facade';

@Component({
  selector: 'main-view-layout',
  templateUrl: './main-view-layout.component.html',
  styleUrl: './main-view-layout.component.scss'
})
@Flowbite()
export class MainViewLayoutComponent implements OnInit {
  @ViewChild('mobileSideBarBtn', { static: false })
  public mobileSideBarBtn: ElementRef<HTMLButtonElement> | undefined =
    undefined;
  constructor(private readonly authFacade: AuthFacade) {}

  ngOnInit(): void {
    if (this.mobileSideBarBtn) {
      this.mobileSideBarBtn.nativeElement.click();
    }
  }

  public get user() {
    return this.authFacade.user$;
  }

  signOut() {
    this.authFacade.signOut();
  }
}
