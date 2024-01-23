import { mockToasts } from '@mocks/data/toasts.mock';
import { ToastProviderService } from '@shared/services/toast-provider.service';
import { of } from 'rxjs';

export const generateMockToastProviderService = (): ToastProviderService => {
  const service = jasmine.createSpyObj<ToastProviderService>(
    'ToastProviderService',
    ['show', 'remove'],
    ['toasts$']
  );

  Object.defineProperty(service, 'toasts$', {
    writable: true,
    value: of([
      ...mockToasts.success,
      ...mockToasts.error,
      ...mockToasts.warning
    ])
  });

  return service;
};
