import { mockLoggedUser } from '@mocks/data/users.mock';
import { AuthService } from '@modules/auth/services/auth.service';
import { of, throwError } from 'rxjs';

export const generateMockAuthService = ({
  errorOnSignInWithGoogle = false,
  errorOnSignInWithGithub = false,
  errorOnSignInWithEmailAndPassword = false,
  errorOnSignUpWithEmailAndPassword = false,
  errorOnSignOut = false,
  errorOnGetUserFromLocalStorage = false,
  userOnStorage = true
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

  service.getUserFromLocalStorage.and.returnValue(of());
  service.removeUserFromLocalStorage.and.returnValue();
  service.saveUserOnLocalStorage.and.returnValue();
  service.sendEmailVerification.and.returnValue(of());

  if (errorOnSignInWithGoogle) {
    const error = throwError(() => new Error('error'));
    service.signInWithGoogle.and.returnValue(error);
  } else {
    service.signInWithGoogle.and.returnValue(of(mockLoggedUser));
  }

  if (errorOnSignInWithGithub) {
    const error = throwError(() => new Error('error'));
    service.signInWithGithub.and.returnValue(error);
  } else {
    service.signInWithGithub.and.returnValue(of(mockLoggedUser));
  }

  if (errorOnSignInWithEmailAndPassword) {
    const error = throwError(() => new Error('error'));
    service.signInWithEmailAndPassword.and.returnValue(error);
  } else {
    service.signInWithEmailAndPassword.and.returnValue(of(mockLoggedUser));
  }

  if (errorOnSignUpWithEmailAndPassword) {
    const error = throwError(() => new Error('error'));
    service.createAccount.and.returnValue(error);
  } else {
    service.createAccount.and.returnValue(of(mockLoggedUser));
  }

  if (errorOnSignOut) {
    const error = throwError(() => new Error('error'));
    service.signOut.and.returnValue(error);
  } else {
    service.signOut.and.returnValue(of(undefined));
  }

  if (errorOnGetUserFromLocalStorage) {
    const error = throwError(() => new Error('error'));
    service.getUserFromLocalStorage.and.returnValue(error);
  } else {
    service.getUserFromLocalStorage.and.returnValue(
      of(userOnStorage ? mockLoggedUser : undefined)
    );
  }

  return service;
};
