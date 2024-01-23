import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { ToastProviderComponent } from './toast-provider.component';
import { ToastProviderService } from '@shared/services/toast-provider.service';
import { generateMockToastProviderService } from '@mocks/services/toast-provider-service.mock';
import { ToastNotification } from '@shared/types/toast-provider.types';
import { take } from 'rxjs';

describe('ToastProviderComponent', () => {
  let component: ToastProviderComponent;
  let fixture: ComponentFixture<ToastProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastProviderComponent],
      providers: [
        {
          provide: ToastProviderService,
          useValue: generateMockToastProviderService()
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to validate if the toast is default or not', fakeAsync(() => {
    let toasts: ToastNotification[] = [];

    component.toasts$.pipe(take(1)).subscribe((data) => {
      toasts = data;
    });

    expect(toasts.length).toBeGreaterThan(0);
  }));

  it('should be able to return if a toast of default or not', fakeAsync(() => {
    let toasts: ToastNotification[] = [];

    component.toasts$.pipe(take(1)).subscribe((data) => {
      toasts = data;
    });

    const toast = { ...toasts[0] };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toast.type = 'custom' as any;

    expect(component.isDefaultToastType(toasts[0].type)).toBeTruthy();
    expect(component.isDefaultToastType(toast.type)).toBeFalsy();
  }));
});
