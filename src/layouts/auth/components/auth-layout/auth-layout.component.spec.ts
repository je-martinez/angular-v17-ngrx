import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayoutComponent } from './auth-layout.component';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ProgressBarComponent } from '@shared/ui/components/progress-bar/progress-bar.component';
import { ToastProviderComponent } from '@shared/ui/components/toast-provider/toast-provider.component';
import { LogoInteractionComponent } from '../logo-interaction/logo-interaction.component';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLayoutComponent, LogoInteractionComponent],
      imports: [
        RouterTestingModule,
        CommonModule,
        ProgressBarComponent,
        ToastProviderComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
