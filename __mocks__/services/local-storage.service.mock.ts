import { mockLoggedUser } from '@mocks/data/users.mock';
import { LocalStorageService } from '@shared/services/local-storage.service';

export const generateMockLocalStorageService = (
  emptyUser = false
): LocalStorageService => {
  const service = jasmine.createSpyObj<LocalStorageService>(
    'LocalStorageService',
    ['setItem', 'removeItem', 'getItem'],
    []
  );
  service.getItem.and.returnValue(
    emptyUser ? undefined : JSON.stringify(mockLoggedUser)
  );
  service.setItem.and.returnValue();
  service.removeItem.and.returnValue();
  return service;
};
