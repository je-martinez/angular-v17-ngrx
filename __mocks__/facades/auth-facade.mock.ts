import { mockLoggedUser } from '@mocks/data/users.mock';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { of } from 'rxjs';

export type MockAuthFacade = AuthFacade | unknown;

export const generateMockAuthFacade = (emptyUser = false): MockAuthFacade => {
  const facade = jasmine.createSpyObj<AuthFacade>('AuthFacade', [], ['user$']);
  Object.defineProperty(facade, 'user$', {
    value: of(emptyUser ? null : mockLoggedUser)
  });
  return facade;
};
