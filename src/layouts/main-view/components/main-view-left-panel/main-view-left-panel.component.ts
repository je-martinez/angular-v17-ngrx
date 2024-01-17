import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Flowbite } from '@infrastructure/decorators/flowbite';

@Component({
  selector: 'main-view-left-panel',
  standalone: true,
  imports: [NgIf],
  templateUrl: './main-view-left-panel.component.html',
  styleUrl: './main-view-left-panel.component.scss'
})
@Flowbite()
export class MainViewLeftPanelComponent {
  @Input({ required: true }) user: User | undefined | null = undefined;
  @Output()
  private readonly signOut = new EventEmitter();
  constructor() {}

  public get displayName() {
    return this.user?.displayName;
  }

  public get email() {
    return this.user?.email;
  }

  public get profilePhoto() {
    return this.user?.photoURL;
  }

  onSignOut() {
    this.signOut.emit();
  }
}
