import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOrLoginPageComponent } from './sign-up-or-login-page.component';

describe('SignUpOrLoginPageComponent', () => {
  let component: SignUpOrLoginPageComponent;
  let fixture: ComponentFixture<SignUpOrLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpOrLoginPageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpOrLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
