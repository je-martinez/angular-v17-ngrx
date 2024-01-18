import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOrLoginPageComponent } from './sign-up-or-login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@modules/auth/services/auth.service';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('SignUpOrLoginPageComponent', () => {
  let component: SignUpOrLoginPageComponent;
  let fixture: ComponentFixture<SignUpOrLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService, AuthFacade],
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpOrLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
