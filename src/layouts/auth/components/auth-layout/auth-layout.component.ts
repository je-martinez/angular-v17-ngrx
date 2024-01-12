import { Component } from '@angular/core';
import { AuthLayoutService } from '../../services/auth-layout.service';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {
  constructor(private readonly authLayoutService: AuthLayoutService) {}

  public get topProgressBar$() {
    return this.authLayoutService.topProgressBar$;
  }
}
