import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../store/modules/auth/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.recoveUserFromStorage();
  }
}
