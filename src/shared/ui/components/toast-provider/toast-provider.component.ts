import { Component } from '@angular/core';
import { ToastSuccessComponent } from '../toast-success/toast-success.component';
import { ToastErrorComponent } from '../toast-error/toast-error.component';
import { ToastInfoComponent } from '../toast-info/toast-info.component';

@Component({
  selector: 'toast-provider',
  standalone: true,
  imports: [ToastInfoComponent, ToastSuccessComponent, ToastErrorComponent],
  templateUrl: './toast-provider.component.html',
  styleUrl: './toast-provider.component.scss'
})
export class ToastProviderComponent {}
