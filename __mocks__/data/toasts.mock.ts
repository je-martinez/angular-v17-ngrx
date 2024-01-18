import { ToastPosition, ToastType } from '@shared/types/toast-provider.enums';
import { ToastNotification } from '@shared/types/toast-provider.types';

interface MockToasts {
  success: ToastNotification[];
  warning: ToastNotification[];
  error: ToastNotification[];
}

export const mockToasts: MockToasts = {
  success: [
    {
      id: '1',
      message: 'Success message #1',
      type: ToastType.Success,
      timeout: 1000,
      position: ToastPosition.TopCenter
    },
    {
      id: '2',
      message: 'Success message #2',
      type: ToastType.Success,
      timeout: 2000,
      position: ToastPosition.TopLeft
    },
    {
      id: '3',
      message: 'Success message #3',
      type: ToastType.Success,
      timeout: 3000,
      position: ToastPosition.TopRight
    },
    {
      id: '4',
      message: 'Success message #4',
      type: ToastType.Success,
      position: ToastPosition.TopRight
    },
    {
      message: 'Success message #5',
      type: ToastType.Success
    }
  ],
  warning: [
    {
      id: '1',
      message: 'Warning message #1',
      type: ToastType.Warning,
      timeout: 1000,
      position: ToastPosition.TopCenter
    },
    {
      id: '2',
      message: 'Warning message #2',
      type: ToastType.Warning,
      timeout: 2000,
      position: ToastPosition.TopLeft
    },
    {
      id: '3',
      message: 'Warning message #3',
      type: ToastType.Warning,
      timeout: 3000,
      position: ToastPosition.TopRight
    },
    {
      id: '4',
      message: 'Warning message #4',
      type: ToastType.Warning,
      position: ToastPosition.TopRight
    },
    {
      message: 'Warning message #5',
      type: ToastType.Warning
    }
  ],
  error: [
    {
      id: '1',
      message: 'Error message #1',
      type: ToastType.Error,
      timeout: 1000,
      position: ToastPosition.TopCenter
    },
    {
      id: '2',
      message: 'Error message #2',
      type: ToastType.Error,
      timeout: 2000,
      position: ToastPosition.TopLeft
    },
    {
      id: '3',
      message: 'Error message #3',
      type: ToastType.Error,
      timeout: 3000,
      position: ToastPosition.TopRight
    },
    {
      id: '4',
      message: 'Error message #4',
      type: ToastType.Error,
      position: ToastPosition.TopRight
    },
    {
      message: 'Error message #5',
      type: ToastType.Error
    }
  ]
};
