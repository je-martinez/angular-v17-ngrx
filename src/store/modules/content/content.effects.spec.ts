import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ContentEffects } from './content.effects';
import { AuthService } from '@modules/auth/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('ContentEffects', () => {
  let actions$: Observable<any>;
  let effects: ContentEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthService,
        ContentEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ContentEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
