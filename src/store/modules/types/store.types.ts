import { AuthState } from '../auth/auth.reducer';
import { ContentState } from '../content/content.reducer';

export interface RootState {
  auth: AuthState;
  content: ContentState;
}
