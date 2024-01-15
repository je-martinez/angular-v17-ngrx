import { Injectable } from '@angular/core';
import {
  IToastNotification,
  ToastNotification
} from '@shared/types/toast-provider.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastProviderService {
  private readonly DEFAULT_TIMEOUT = 5000;
  private toastsBS = new BehaviorSubject<ToastNotification[]>([]);
  public toasts$ = this.toastsBS.asObservable();

  public show(toast: IToastNotification): void {
    const newToast = new ToastNotification({
      ...toast,
      timeout: toast.timeout || this.DEFAULT_TIMEOUT
    });
    this.toastsBS.next([...this.toastsBS.value, newToast]);
    setTimeout(() => {
      this.remove(newToast.id);
    }, newToast.timeout);
  }

  public remove(id: string): void {
    const toasts = this.toastsBS.value.filter((t) => t.id !== id);
    this.toastsBS.next(toasts);
  }
}
