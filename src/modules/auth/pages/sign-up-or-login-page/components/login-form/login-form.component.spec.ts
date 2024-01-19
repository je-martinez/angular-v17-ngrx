import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SignUpOrLoginErrorForm } from '@modules/auth/types/auth.types';
import { By } from '@angular/platform-browser';
import { FormErrorMessageComponent } from '@shared/ui/components/form-error-message/form-error-message.component';
import { mockLoginOrSignUpForm } from '@mocks/forms/form.mock';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render email errors arrays if exists in the form', () => {
    const errors: SignUpOrLoginErrorForm[] = [
      {
        message: 'password error',
        ignoreOnSignUp: false,
        ignoreOnLogin: false
      }
    ];
    const form = mockLoginOrSignUpForm();
    form.controls.email.setValue('test');
    form.controls.password.setValue('test');
    component.loginForm = form;
    component.emailErrors = errors;
    fixture.detectChanges();

    const elementsError = fixture.debugElement.queryAll(
      By.directive(FormErrorMessageComponent)
    );

    expect(elementsError?.length).toBe(component?.emailErrors?.length);
  });

  it('should render password errors arrays if exists in the form', () => {
    const errors: SignUpOrLoginErrorForm[] = [
      {
        message: 'password error',
        ignoreOnSignUp: false,
        ignoreOnLogin: false
      }
    ];
    const form = mockLoginOrSignUpForm();
    form.controls.email.setValue('test');
    form.controls.password.setValue('test');
    component.loginForm = form;
    component.passwordErrors = errors;
    fixture.detectChanges();

    const elementsError = fixture.debugElement.queryAll(
      By.directive(FormErrorMessageComponent)
    );

    expect(elementsError?.length).toBe(component?.passwordErrors?.length);
  });

  it('should not render errors arrays if form doesnt have any', () => {
    const errors: SignUpOrLoginErrorForm[] = [];
    const form = mockLoginOrSignUpForm();
    component.loginForm = form;
    component.passwordErrors = errors;
    component.emailErrors = errors;
    fixture.detectChanges();

    const elementsError = fixture.debugElement.queryAll(
      By.directive(FormErrorMessageComponent)
    );

    expect(elementsError?.length).toBe(0);
  });

  it('should be able to trigger method on button click (submit) - email w/ password', fakeAsync(() => {
    const form = mockLoginOrSignUpForm();
    component.loginForm = form;
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(
      By.css('#login-form-button')
    );
    expect(submitButton).toBeTruthy();

    spyOn(component, 'onSubmit');
    submitButton.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should be able to emit to parent on submit - email w/ password', () => {
    const emitSpy = spyOn(component.loginWithEmailAndPassword, 'emit');
    component.onSubmit();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should be able to trigger method on button click (sign in w/ google)', fakeAsync(() => {
    const submitButton = fixture.debugElement.query(
      By.css('#google-sign-in-button')
    );
    expect(submitButton).toBeTruthy();

    spyOn(component, 'onGoogleSignIn');
    submitButton.nativeElement.click();
    expect(component.onGoogleSignIn).toHaveBeenCalled();
  }));

  it('should be able to emit to parent on sign in w/ google', () => {
    const emitSpy = spyOn(component.googleSignIn, 'emit');
    component.onGoogleSignIn();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should be able to trigger method on button click (sign in w/ github)', fakeAsync(() => {
    const submitButton = fixture.debugElement.query(
      By.css('#github-sign-in-button')
    );
    expect(submitButton).toBeTruthy();

    spyOn(component, 'onGithubSignIn');
    submitButton.nativeElement.click();
    expect(component.onGithubSignIn).toHaveBeenCalled();
  }));

  it('should be able to emit to parent on sign in w/ github', () => {
    const emitSpy = spyOn(component.githubSignUp, 'emit');
    component.onGithubSignIn();
    expect(emitSpy).toHaveBeenCalled();
  });
});
