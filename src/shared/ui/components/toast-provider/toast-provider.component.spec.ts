import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastProviderComponent } from './toast-provider.component';

describe('ToastProviderComponent', () => {
  let component: ToastProviderComponent;
  let fixture: ComponentFixture<ToastProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastProviderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ToastProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
