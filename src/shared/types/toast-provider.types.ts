import { ToastPosition, ToastType } from './toast-provider.enums';
export interface ToastNotification {
  id?: string;
  message: string;
  type: ToastType;
  timeout?: number;
  position?: ToastPosition;
}
