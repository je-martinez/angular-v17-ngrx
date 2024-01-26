import { Injectable } from '@angular/core';
import {
  TOAST_DEFAULT_POSITION,
  TOAST_DEFAULT_TIMEOUT
} from '@shared/constants/toast-provider.constants';
import { ToastNotification } from '@shared/types/toast-provider.types';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ToastProviderService {
  private readonly toastsBS = new BehaviorSubject<ToastNotification[]>([]);
  public toasts$ = this.toastsBS.asObservable();

  public show({
    id,
    message,
    type,
    timeout,
    position
  }: ToastNotification): void {
    this.toastsBS.next([
      ...this.toastsBS.value,
      {
        id: id ?? uuidv4(),
        message,
        type,
        timeout: timeout ?? TOAST_DEFAULT_TIMEOUT,
        position: position ?? TOAST_DEFAULT_POSITION
      }
    ]);
  }

  public remove(id: string): void {
    const toasts = this.toastsBS.value.filter((t) => t.id !== id);
    this.toastsBS.next(toasts);
  }
}
