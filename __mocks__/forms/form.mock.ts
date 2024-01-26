import { FormBuilder, Validators } from '@angular/forms';
import { PASSWORD_REGEX } from '@modules/auth/constants/auth.constants';

export const mockLoginOrSignUpForm = () => {
  const fb = new FormBuilder();
  return fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(PASSWORD_REGEX)]]
  });
};
