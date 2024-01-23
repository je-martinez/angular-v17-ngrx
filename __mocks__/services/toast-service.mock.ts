import { mockToasts } from '@mocks/data/toasts.mock';
import { ToastProviderService } from '@shared/services/toast-provider.service';

export const generateMockToastService = (): ToastProviderService => {
  const service = jasmine.createSpyObj(
    'ToastProviderService',
    ['showToast'],
    ['$toasts']
  );
  Object.defineProperty(service, '$toasts', {
    value: [mockToasts.success, mockToasts.error, mockToasts.warning]
  });
  return service;
};
