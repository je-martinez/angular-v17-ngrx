import { Injectable } from '@angular/core';
import { ToastType } from '@shared/types/toast-provider.enums';
import {
  IToastNotification,
  ToastNotification
} from '@shared/types/toast-provider.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastProviderService {
  private toastsBS = new BehaviorSubject<ToastNotification[]>([]);
  public toasts$ = this.toastsBS.asObservable();

  constructor() {
    this.show({
      type: ToastType.Success,
      message: 'This is a success message'
    });
  }

  public show(toast: IToastNotification): void {
    const newToast = new ToastNotification({
      ...toast
    });
    this.toastsBS.next([...this.toastsBS.value, newToast]);
  }

  public remove(id: string): void {
    const toasts = this.toastsBS.value.filter((t) => t.id !== id);
    this.toastsBS.next(toasts);
  }
}
