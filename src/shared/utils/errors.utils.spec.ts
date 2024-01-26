import { SignInWithPopupErrorCodes } from '@shared/types/firebase-auth-errors.enums';
import { getSignInWithPopupErrorByCode } from './errors.utils';
import { SignInWithPopupErrors } from '@shared/constants/errors.constants';

describe('getSignInWithPopupErrorByCode', () => {
  it('should return the correct error message for a known error code', () => {
    const errorCode = SignInWithPopupErrorCodes.AUTH_DOMAIN_CONFIG_REQUIRED;
    const expectedErrorMessage = SignInWithPopupErrors.get(errorCode);
    expect(getSignInWithPopupErrorByCode(errorCode)).toBe(
      expectedErrorMessage!
    );
  });

  it('should return "Unknown error" for an unknown error code', () => {
    const errorCode = 'UNKNOWN_ERROR_CODE';
    expect(getSignInWithPopupErrorByCode(errorCode)).toBe('Unknown error');
  });
});
