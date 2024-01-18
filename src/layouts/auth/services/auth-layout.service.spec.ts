import { TestBed } from '@angular/core/testing';

import { AuthLayoutService } from './auth-layout.service';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';

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

  it('should change the value of the observable based on the value received in the method', () => {
    for (const option of [true, false]) {
      service.showTopProgressBar(option);
      service.topProgressBar$.pipe(take(1)).subscribe((value) => {
        expect(value).toBe(option);
      });
    }
  });
});
