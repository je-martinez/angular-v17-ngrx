import { mockLoggedUser } from '@mocks/data/users.mock';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { of } from 'rxjs';

export const generateMockAuthFacade = (emptyUser = false): AuthFacade => {
  const facade = jasmine.createSpyObj<AuthFacade>(
    'AuthFacade',
    ['signOut'],
    ['user$']
  );
  Object.defineProperty(facade, 'user$', {
    value: of(emptyUser ? null : mockLoggedUser)
  });
  facade.signOut.and.returnValue();
  return facade;
};
