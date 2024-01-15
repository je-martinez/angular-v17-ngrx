import { SignInWithPopupErrors } from '@shared/constants/errors.constants';
import { SignInWithPopupErrorCodes } from '@shared/types/firebase-auth-errors.enums';

export const getSignInWithPopupErrorByCode = (
  code: SignInWithPopupErrorCodes | string
) => {
  return (
    SignInWithPopupErrors.get(code as SignInWithPopupErrorCodes) ??
    'Uknown error'
  );
};
