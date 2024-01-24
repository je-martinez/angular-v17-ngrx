import { AuthService } from '@modules/auth/services/auth.service';
import { of } from 'rxjs';

export const generateMockAuthService = (): AuthService => {
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
  service.signInWithGoogle.and.returnValue(of());
  service.signOut.and.returnValue(of());
  return service;
};
