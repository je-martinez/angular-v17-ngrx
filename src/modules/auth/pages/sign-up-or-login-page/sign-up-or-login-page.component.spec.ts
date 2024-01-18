import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOrLoginPageComponent } from './sign-up-or-login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@modules/auth/services/auth.service';
import { AuthFacade } from '@store/modules/auth/auth.facade';

describe('SignUpOrLoginPageComponent', () => {
  let component: SignUpOrLoginPageComponent;
  let fixture: ComponentFixture<SignUpOrLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [AuthService, AuthFacade],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpOrLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
