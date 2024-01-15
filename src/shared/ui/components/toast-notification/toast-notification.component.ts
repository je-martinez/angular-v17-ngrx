import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ToastType } from '@shared/types/toast-provider.enums';
import { ToastNotification } from '@shared/types/toast-provider.types';

@Component({
  selector: 'toast-notification',
  standalone: true,
  imports: [NgClass, NgSwitch, NgSwitchCase],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.scss'
})
export class ToastNotificationComponent {
  @ViewChild(ElementRef) public closeBtn: ElementRef | undefined = undefined;
  @Input({ required: true }) public toast: ToastNotification =
    {} as ToastNotification;

  public readonly types = ToastType;

  constructor() {}

  public get toastClass(): string {
    switch (this.toast.type) {
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

  public get toastIconClass(): string {
    switch (this.toast.type) {
      case ToastType.Success:
        return 'fa-check-circle';
      case ToastType.Error:
        return 'fa-exclamation-circle';
      case ToastType.Warning:
        return 'fa-info-circle';
      default:
        return 'fa-info-circle';
    }
  }

  public get toastElementId() {
    switch (this.toast.type) {
      case ToastType.Success:
        return `toast-success-${this.toast.id}`;
      case ToastType.Error:
        return `toast-error-${this.toast.id}`;
      case ToastType.Warning:
        return `toast-warning-${this.toast.id}`;
      default:
        return `toast-default-${this.toast.id}`;
    }
  }

  public get dismissTargetId() {
    return `#${this.toastElementId}`;
  }

  public get id(): string {
    return this.toast.id;
  }

  public get message(): string {
    return this.toast.message;
  }

  public get type(): string {
    return this.toast.type;
  }
}
