import { Component } from '@angular/core';
import { ToastSuccessComponent } from '../toast-success/toast-success.component';
import { ToastErrorComponent } from '../toast-error/toast-error.component';
import { ToastInfoComponent } from '../toast-info/toast-info.component';
import { ToastType } from '@shared/types/toast-provider.enums';
import { AsyncPipe, NgForOf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ToastProviderService } from '@shared/services/toast-provider.service';

@Component({
  selector: 'toast-provider',
  standalone: true,
  imports: [
    ToastInfoComponent,
    ToastSuccessComponent,
    ToastErrorComponent,
    NgForOf,
    AsyncPipe,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './toast-provider.component.html',
  styleUrl: './toast-provider.component.scss'
})
export class ToastProviderComponent {
  public readonly types = ToastType;
  constructor(private readonly toastProviderService: ToastProviderService) {}

  public get toasts$() {
    return this.toastProviderService.toasts$;
  }
}
