import { ToastType } from './toast-provider.enums';
import { v4 as uuidv4 } from 'uuid';

export interface IToastNotification {
  id?: string;
  message: string;
  type: ToastType;
  timeout?: number;
}

export class ToastNotification implements IToastNotification {
  public id: string;
  public message: string;
  public type: ToastType;
  public timeout: number;
  constructor({ id = uuidv4(), message, type, timeout }: IToastNotification) {
    this.id = id;
    this.message = message;
    this.type = type;
    this.timeout = timeout || 5000;
  }
}
