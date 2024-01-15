import { SignInWithPopupErrorCodes } from '@shared/types/firebase-auth-errors.enums';

export const SignInWithPopupErrors = new Map([
  [
    SignInWithPopupErrorCodes.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL,
    'Account exists with a different credential'
  ],
  [
    SignInWithPopupErrorCodes.AUTH_DOMAIN_CONFIG_REQUIRED,
    'Auth domain configuration is required'
  ],
  [
    SignInWithPopupErrorCodes.CANCELLED_POPUP_REQUEST,
    'Cancelled popup request'
  ],
  [SignInWithPopupErrorCodes.OPERATION_NOT_ALLOWED, 'Operation not allowed'],
  [
    SignInWithPopupErrorCodes.OPERATION_NOT_SUPPORTED_IN_THIS_ENVIRONMENT,
    'Operation not supported in this environment'
  ],
  [SignInWithPopupErrorCodes.POPUP_BLOCKED, 'Popup blocked'],
  [SignInWithPopupErrorCodes.POPUP_CLOSED_BY_USER, 'Popup closed by user'],
  [SignInWithPopupErrorCodes.UNAUTHORIZED_DOMAIN, 'Unauthorized domain']
]);
