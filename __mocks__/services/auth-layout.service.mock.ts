import { AuthLayoutService } from '@layouts/auth/services/auth-layout.service';
import { of } from 'rxjs';

export const generateMockAuthLayoutService = (): AuthLayoutService => {
  const service = jasmine.createSpyObj<AuthLayoutService>(
    'AuthLayoutService',
    ['showTopProgressBar'],
    ['topProgressBar$']
  );
  Object.defineProperty(service, 'topProgressBar$', {
    value: of(false),
    writable: true
  });
  service.showTopProgressBar.and.returnValue();
  return service;
};
