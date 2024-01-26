import { mockLoggedUser } from '@mocks/data/users.mock';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { of } from 'rxjs';

export const generateMockAuthFacade = (emptyUser = false): AuthFacade => {
  const facade = jasmine.createSpyObj<AuthFacade>(
    'AuthFacade',
    [
      'signInWGoogle',
      'signInWGithub',
      'signUpWEmailAndPassword',
      'signInWEmailAndPassword',
      'signOut',
      'recoveUserFromStorage'
    ],
    ['user$']
  );
  Object.defineProperty(facade, 'user$', {
    value: of(emptyUser ? null : mockLoggedUser)
  });
  facade.signInWGoogle.and.returnValue();
  facade.signInWGithub.and.returnValue();
  facade.signUpWEmailAndPassword.and.returnValue();
  facade.signInWEmailAndPassword.and.returnValue();
  facade.signOut.and.returnValue();
  facade.recoveUserFromStorage.and.returnValue();
  return facade;
};
