import { mockLoggedUser } from '@mocks/data/users.mock';
import { AuthActions } from './auth.actions';
import { AuthState, initialState, reducer } from './auth.reducer';
import { SignUpOrLoginFormDTO } from '@modules/auth/types/auth.DTOs';

describe('Auth Reducer', () => {
  describe('an unknown action', () => {
    it('should return the initial state', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('an known action', () => {
    it('should return the desire state on Sign In w Google', () => {
      const action = AuthActions.signInWGoogle();

      const desiredState: AuthState = {
        ...initialState,
        loadingSignInWithGoogle: true
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign In w Google [Success]', () => {
      const user = { ...mockLoggedUser };

      const action = AuthActions.signInWGoogleSuccess({
        data: user
      });

      const desiredState: AuthState = {
        ...initialState,
        loadingSignInWithGoogle: false,
        user: user
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign In w Google [Failure]', () => {
      const err = new Error('Oops!');

      const action = AuthActions.signInWGoogleFailure({
        error: err.message
      });

      const desiredState: AuthState = {
        ...initialState,
        onErrorSignInWithGoogle: err.message,
        loadingSignInWithGoogle: false
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign In w Github', () => {
      const action = AuthActions.signInWGithub();

      const desiredState: AuthState = {
        ...initialState,
        loadingSignInWithGithub: true
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign In w Github [Success]', () => {
      const user = { ...mockLoggedUser };

      const action = AuthActions.signInWGithubSuccess({
        data: user
      });

      const desiredState: AuthState = {
        ...initialState,
        user: user,
        loadingSignInWithGithub: false
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign In w Github [Failure]', () => {
      const err = new Error('Oops!');

      const action = AuthActions.signInWGithubFailure({
        error: err.message
      });

      const desiredState: AuthState = {
        ...initialState,
        onErrorSignInWithGithub: err.message,
        loadingSignInWithGithub: false
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Recover User From Storage', () => {
      const action = AuthActions.recoverUserFromStorage();

      const desiredState: AuthState = {
        ...initialState
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Recover User From Storage [Success]', () => {
      const user = { ...mockLoggedUser };

      const action = AuthActions.recoverUserFromStorageSuccess({
        data: user
      });

      const desiredState: AuthState = {
        ...initialState,
        user: user
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Recover User From Storage [Failure]', () => {
      const action = AuthActions.recoverUserFromStorageFailure();

      const desiredState: AuthState = {
        ...initialState,
        user: undefined
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign Up w Email And Password', () => {
      const input: SignUpOrLoginFormDTO = {
        email: 'fake-email@mail.com',
        password: 'fake-password'
      };

      const action = AuthActions.signUpWEmailAndPassword({
        input
      });

      const desiredState: AuthState = {
        ...initialState,
        loadingSignUpWithEmailAndPassword: true
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign Up w Email And Password [Success]', () => {
      const user = { ...mockLoggedUser };

      const action = AuthActions.signUpWEmailAndPasswordSuccess({
        data: user
      });

      const desiredState: AuthState = {
        ...initialState,
        user: user,
        loadingSignUpWithEmailAndPassword: false
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign Up w Email And Password [Failure]', () => {
      const err = new Error('Oops!');

      const action = AuthActions.signUpWEmailAndPasswordFailure({
        error: err.message
      });

      const desiredState: AuthState = {
        ...initialState,
        loadingSignUpWithEmailAndPassword: false,
        onErrorSignUpWithEmailAndPassword: err.message
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign In w Email And Password', () => {
      const input: SignUpOrLoginFormDTO = {
        email: 'fake-email@mail.com',
        password: 'fake-password'
      };

      const action = AuthActions.signInWEmailAndPassword({
        input
      });

      const desiredState: AuthState = {
        ...initialState,
        loadingSignInWithEmailAndPassword: true
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign In w Email And Password [Success]', () => {
      const user = { ...mockLoggedUser };

      const action = AuthActions.signInWEmailAndPasswordSuccess({
        data: user
      });

      const desiredState: AuthState = {
        ...initialState,
        user: user,
        loadingSignInWithEmailAndPassword: false
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign In w Email And Password [Failure]', () => {
      const err = new Error('Oops!');

      const action = AuthActions.signInWEmailAndPasswordFailure({
        error: err.message
      });

      const desiredState: AuthState = {
        ...initialState,
        loadingSignInWithEmailAndPassword: false,
        onErrorSignInWithEmailAndPassword: err.message
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign Out', () => {
      const action = AuthActions.signOut();

      const desiredState: AuthState = {
        ...initialState,
        loadingSignOut: true
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign Out [Success]', () => {
      const action = AuthActions.signOutSuccess();

      const desiredState: AuthState = {
        ...initialState
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });

    it('should return the desire state on Sign Sign Out [Failure]', () => {
      const action = AuthActions.signOutFailure();

      const desiredState: AuthState = {
        ...initialState
      };

      const result = reducer(initialState, action);

      expect(result).toEqual(desiredState);
    });
  });
});
