import { mockLoggedUser } from '@mocks/data/users.mock';
import { AuthService } from '@modules/auth/services/auth.service';
import { of, throwError } from 'rxjs';

export const generateMockAuthService = ({
  errorOnSignInWithGoogle = false
}): AuthService => {
  const service = jasmine.createSpyObj<AuthService>('AuthService', [
    'createAccount',
    'getUserFromLocalStorage',
    'removeUserFromLocalStorage',
    'saveUserOnLocalStorage',
    'sendEmailVerification',
    'sendPasswordResetEmail',
    'signInWithEmailAndPassword',
    'signInWithGithub',
    'signInWithGoogle',
    'signOut'
  ]);

  service.createAccount.and.returnValue(of());
  service.getUserFromLocalStorage.and.returnValue(of());
  service.removeUserFromLocalStorage.and.returnValue();
  service.saveUserOnLocalStorage.and.returnValue();
  service.sendEmailVerification.and.returnValue(of());
  service.signInWithEmailAndPassword.and.returnValue(of());
  service.signInWithGithub.and.returnValue(of());
  if (errorOnSignInWithGoogle) {
    const error = throwError(() => new Error('Fake error'));
    service.signInWithGoogle.and.returnValue(error);
  } else {
    service.signInWithGoogle.and.returnValue(of(mockLoggedUser));
  }
  service.signOut.and.returnValue(of());
  return service;
};
