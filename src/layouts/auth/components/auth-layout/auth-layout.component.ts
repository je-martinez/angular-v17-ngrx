import { Component } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { AuthLayoutService } from '@layouts/auth/services/auth-layout.service';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
@Flowbite()
export class AuthLayoutComponent {
  constructor(private readonly authLayoutService: AuthLayoutService) {}

  public get topProgressBar$() {
    return this.authLayoutService.topProgressBar$;
  }
}
