import { TestBed } from '@angular/core/testing';

import { ToastProviderService } from './toast-provider.service';
import { take } from 'rxjs';
import { mockToasts } from '@mocks/data/toasts.mock';
import {
  TOAST_DEFAULT_POSITION,
  TOAST_DEFAULT_TIMEOUT
} from '@shared/constants/toast-provider.constants';

describe('ToastProviderService', () => {
  let service: ToastProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init with an empty array', () => {
    service.toasts$.pipe(take(1)).subscribe((value) => {
      expect(value).toEqual([]);
    });
  });

  it('should add a incoming toast into the observable state', () => {
    const toastToAdd = mockToasts.success[0];
    service.show(toastToAdd);
    service.toasts$.pipe(take(1)).subscribe((value) => {
      expect(value).toEqual([toastToAdd]);
    });
  });

  it('should remove a toast from the observable state', () => {
    const toastToAdd = mockToasts.success[1];
    service.show(toastToAdd);
    service.remove(toastToAdd.id!);
    service.toasts$.pipe(take(1)).subscribe((value) => {
      expect(value).toEqual([]);
    });
  });

  it('should set default values if id, timeout and position are not provided in toast object', () => {
    const toastToAdd = mockToasts.success[4];
    service.show(toastToAdd);
    service.toasts$.pipe(take(1)).subscribe((value) => {
      const toast = value[0];
      expect(toast.id).toBeDefined();
      expect(toast.timeout).toBe(TOAST_DEFAULT_TIMEOUT);
      expect(toast.position).toBe(TOAST_DEFAULT_POSITION);
    });
  });
});
