import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { ToastNotificationComponent } from './toast-notification.component';
import { ToastProviderService } from '@shared/services/toast-provider.service';
import { generateMockToastProviderService } from '@mocks/services/toast-provider-service.mock';
import { mockToasts } from '@mocks/data/toasts.mock';

describe('ToastNotificationComponent', () => {
  let component: ToastNotificationComponent;
  let fixture: ComponentFixture<ToastNotificationComponent>;
  let facade: ToastProviderService;
  const successToast = mockToasts.success[0];
  const errorToast = mockToasts.error[0];
  const warningToast = mockToasts.warning[0];

  beforeEach(async () => {
    facade = generateMockToastProviderService();
    await TestBed.configureTestingModule({
      imports: [ToastNotificationComponent],
      providers: [
        {
          provide: ToastProviderService,
          useValue: facade
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.toast = successToast;

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should close toast', fakeAsync(() => {
    component.toast = { ...successToast, timeout: 2000 };

    component.ngOnInit();
    fixture.detectChanges();

    const methodSpy = spyOn(component, 'closeToast');

    tick(3000);

    fixture.detectChanges();

    expect(component.closeToast).toHaveBeenCalled();

    methodSpy.calls.reset();
  }));

  it('should call facade if the closeToast is triggered toast and remove it from the service', fakeAsync(() => {
    component.toast = { ...errorToast, timeout: 2000 };
    component.closeToast();
    fixture.detectChanges();
    tick(3000);
    fixture.detectChanges();
    expect(facade.remove).toHaveBeenCalled();
  }));

  it('should not call facade if the toast doesnt have an id', fakeAsync(() => {
    component.toast = { ...errorToast, timeout: 2000, id: undefined };
    component.closeToast();
    fixture.detectChanges();
    tick(3000);
    fixture.detectChanges();
    expect(facade.remove).not.toHaveBeenCalled();
  }));
});
