import { TOAST_DEFAULT_TIMEOUT } from '@shared/constants/toast-provider.constants';
import { ToastPosition, ToastType } from './toast-provider.enums';
import { v4 as uuidv4 } from 'uuid';

export interface IToastNotification {
  id?: string;
  message: string;
  type: ToastType;
  timeout?: number;
  position?: ToastPosition;
}

export class ToastNotification implements IToastNotification {
  public id: string;
  public message: string;
  public type: ToastType;
  public timeout: number;
  public position: ToastPosition;
  constructor({
    id = uuidv4(),
    message,
    type,
    timeout,
    position
  }: IToastNotification) {
    this.id = id;
    this.message = message;
    this.type = type;
    this.timeout = timeout || TOAST_DEFAULT_TIMEOUT;
    this.position = position || ToastPosition.TopCenter;
  }
}
