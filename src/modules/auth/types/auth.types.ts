export interface SignUpOrLoginErrorForm {
  message: string;
  ignoreOnSignUp: boolean;
  ignoreOnLogin: boolean;
}

export interface FirebaseAuthError {
  code: string;
  message: string;
  name: string;
}
