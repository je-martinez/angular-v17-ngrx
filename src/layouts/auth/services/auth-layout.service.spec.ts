import { TestBed } from '@angular/core/testing';

import { AuthLayoutService } from './auth-layout.service';
import { CommonModule } from '@angular/common';

describe('AuthLayoutService', () => {
  let service: AuthLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule]
    });
    service = TestBed.inject(AuthLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
