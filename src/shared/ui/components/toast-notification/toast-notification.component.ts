import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { ToastProviderService } from '@shared/services/toast-provider.service';
import { ToastPosition, ToastType } from '@shared/types/toast-provider.enums';
import { ToastNotification } from '@shared/types/toast-provider.types';

@Component({
  selector: 'toast-notification',
  standalone: true,
  imports: [NgClass, NgSwitch, NgSwitchCase],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.scss'
})
@Flowbite()
export class ToastNotificationComponent implements OnInit, OnDestroy {
  @ViewChild('closeBtn', { static: false }) public closeBtn:
    | ElementRef
    | undefined = undefined;
  @Input({ required: true }) public toast: ToastNotification =
    {} as ToastNotification;

  public readonly types = ToastType;

  constructor(private toastProviderService: ToastProviderService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.closeToast();
    }, this.toast.timeout);
  }

  public get id(): string | undefined {
    return this.toast.id;
  }

  public get message(): string {
    return this.toast.message;
  }

  public get type(): string {
    return this.toast.type;
  }

  public get position(): ToastPosition | undefined {
    return this.toast.position;
  }

  public get classAligment() {
    switch (this.position) {
      case ToastPosition.TopCenter:
        return 'justify-center';
      case ToastPosition.TopLeft:
        return 'justify-start';
      case ToastPosition.TopRight:
        return 'justify-end';
      default:
        return 'justify-center';
    }
  }

  public get toastClass(): string {
    switch (this.type) {
      case ToastType.Success:
        return 'text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200';
      case ToastType.Error:
        return 'text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200';
      case ToastType.Warning:
        return 'text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200';
      default:
        return 'toast-default';
    }
  }

  public get toastElementId() {
    switch (this.toast.type) {
      case ToastType.Success:
        return `toast-success-${this.id}`;
      case ToastType.Error:
        return `toast-error-${this.id}`;
      case ToastType.Warning:
        return `toast-warning-${this.id}`;
      default:
        return `toast-default-${this.id}`;
    }
  }

  closeToast() {
    this.closeBtn?.nativeElement?.click();
    setTimeout(() => {
      if (!this.id) return;
      this.toastProviderService.remove(this.id);
    }, 500);
  }

  ngOnDestroy(): void {
    if (!this.id) return;
    this.toastProviderService.remove(this.id);
  }

  public get dismissTargetId() {
    return `#${this.toastElementId}`;
  }
}
