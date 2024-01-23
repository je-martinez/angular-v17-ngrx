import { TestBed } from '@angular/core/testing';
import { AuthFacade } from './auth.facade';
import { RootState } from '../types/store.types';
import { Store } from '@ngrx/store';
import { generateMockStore } from '@mocks/store/store.mock';
import { AuthActions } from './auth.actions';
import { SignUpOrLoginFormDTO } from '@modules/auth/types/auth.DTOs';

describe('AuthFacade', () => {
  let service: AuthFacade;
  // eslint-disable-next-line @ngrx/no-typed-global-store
  let store: Store<RootState>;
  beforeEach(() => {
    store = generateMockStore();
    TestBed.configureTestingModule({
      providers: [
        AuthFacade,
        {
          provide: Store<RootState>,
          useValue: store
        }
      ]
    });
    service = TestBed.inject(AuthFacade);
  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch sign in with Google action', () => {
    service.signInWGoogle();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.signInWGoogle());
  });

  it('should dispatch sign in with Github action', () => {
    service.signInWGithub();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.signInWGithub());
  });

  it('should dispatch sign in with email and password action', () => {
    const input: SignUpOrLoginFormDTO = {
      email: 'fake-user@mail.com',
      password: 'fake-password'
    };
    service.signInWEmailAndPassword(input);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.signInWEmailAndPassword({ input })
    );
  });

  it('should dispatch sign up with email and password action', () => {
    const input: SignUpOrLoginFormDTO = {
      email: 'fake-user@mail.com',
      password: 'fake-password'
    };
    service.signUpWEmailAndPassword(input);
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.signUpWEmailAndPassword({ input })
    );
  });

  it('should dispatch sign out', () => {
    service.signOut();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(AuthActions.signOut());
  });

  it('should dispatch recover user from storage', () => {
    service.signOut();
    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(
      AuthActions.recoverUserFromStorage()
    );
  });
});
