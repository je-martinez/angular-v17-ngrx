import { Injectable } from '@angular/core';
import { ToastPosition, ToastType } from '@shared/types/toast-provider.enums';
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
