import { Component } from '@angular/core';
import { ToastType } from '@shared/types/toast-provider.enums';
import {
  AsyncPipe,
  CommonModule,
  NgForOf,
  NgIf,
  NgSwitch,
  NgSwitchCase
} from '@angular/common';
import { ToastProviderService } from '@shared/services/toast-provider.service';
import { ToastNotificationComponent } from '../toast-notification/toast-notification.component';

@Component({
  selector: 'toast-provider',
  standalone: true,
  imports: [
    ToastNotificationComponent,
    NgForOf,
    NgIf,
    AsyncPipe,
    NgSwitch,
    NgSwitchCase,
    CommonModule
  ],
  templateUrl: './toast-provider.component.html',
  styleUrl: './toast-provider.component.scss'
})
export class ToastProviderComponent {
  public readonly types = ToastType;
  constructor(private readonly toastProviderService: ToastProviderService) {}

  public isDefaultToastType(toast: ToastType) {
    return (
      toast === ToastType.Success ||
      toast === ToastType.Error ||
      toast === ToastType.Warning
    );
  }

  public get toasts$() {
    return this.toastProviderService.toasts$;
  }
}
