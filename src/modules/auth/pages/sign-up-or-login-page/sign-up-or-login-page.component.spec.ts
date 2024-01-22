import { TestBed, fakeAsync } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { AuthInitialPageMode } from '@modules/auth/types/auth.enums';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthFacade } from '@store/modules/auth/auth.facade';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpOrLoginPageComponent } from './sign-up-or-login-page.component';
import { generateMockAuthFacade } from '@mocks/facades/auth.facade.mock';

describe('SignUpOrLoginPageComponent', () => {
  const setup = async (mode = AuthInitialPageMode.SIGN_UP) => {
    const facade = generateMockAuthFacade();
    const fakeRoute = {
      snapshot: {
        data: {
          mode
        }
      } as Partial<ActivatedRouteSnapshot>
    } as ActivatedRoute;
    await TestBed.configureTestingModule({
      declarations: [SignUpOrLoginPageComponent],
      providers: [
        AuthService,
        AuthFacade,
        { provide: ActivatedRoute, useValue: fakeRoute },
        { provide: AuthFacade, useValue: facade }
      ],
      imports: [
        SignUpFormComponent,
        LoginFormComponent,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([])
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(SignUpOrLoginPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    return {
      fixture,
      component,
      facade
    };
  };

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });

  it('should diplay sign up form is the mode is SignUp', async () => {
    const { fixture } = await setup();

    const signUpFormComponent = fixture.debugElement.query(
      By.directive(SignUpFormComponent)
    );
    const loginFormComponent = fixture.debugElement.query(
      By.directive(LoginFormComponent)
    );
    expect(signUpFormComponent).toBeTruthy();
    expect(loginFormComponent).toBeFalsy();
  });

  it('should diplay login form is the mode is Login', async () => {
    const { fixture } = await setup(AuthInitialPageMode.LOGIN);

    const signUpFormComponent = fixture.debugElement.query(
      By.directive(SignUpFormComponent)
    );
    const loginFormComponent = fixture.debugElement.query(
      By.directive(LoginFormComponent)
    );
    expect(signUpFormComponent).toBeFalsy();
    expect(loginFormComponent).toBeTruthy();
  });

  it('should generate array of errors (email)', async () => {
    const { component, fixture } = await setup();

    const submitButton = fixture.debugElement.query(By.css('#sign-up-button'));

    //Try to submit the form to generate all the errors
    submitButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.emailErrors.length).toBeGreaterThan(0);
    expect(component.emailInputHasErrors).toBeTrue();

    //Generate email invalid
    component.signUpOrLoginForm?.controls['email'].setValue('invalidEmail');
    fixture.detectChanges();

    //Try to submit again
    submitButton.nativeElement.click();

    const invalidEmailError = component.emailErrors.find((error) =>
      error.message.toLowerCase().includes('invalid')
    );

    expect(invalidEmailError).toBeTruthy();
  });

  it('should generate array of errors (password)', async () => {
    const { component, fixture } = await setup();

    const submitButton = fixture.debugElement.query(By.css('#sign-up-button'));

    //Try to submit the form to generate all the errors
    submitButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.passwordErrors.length).toBeGreaterThan(0);
    expect(component.passwordInputHasErrors).toBeTrue();
  });

  it('should mark form as valid (if they arent errors) and submit (sign up mode)', async () => {
    const { component, fixture, facade } = await setup();

    component.signUpOrLoginForm?.controls['email'].setValue(
      'fake.user@mail.com'
    );
    component.signUpOrLoginForm?.controls['password'].setValue(
      'Holacomoestas1!'
    );

    const submitButton = fixture.debugElement.query(By.css('#sign-up-button'));

    //Try to submit the form to generate all the errors
    submitButton.nativeElement.click();

    expect(component.isFormValid).toBeTrue();
    expect(facade.signUpWEmailAndPassword).toHaveBeenCalled();
  });

  it('should mark form as valid (if they arent errors) and submit (login mode)', async () => {
    const { component, fixture, facade } = await setup(
      AuthInitialPageMode.LOGIN
    );

    component.signUpOrLoginForm?.controls['email'].setValue(
      'fake.user@mail.com'
    );
    component.signUpOrLoginForm?.controls['password'].setValue(
      'Holacomoestas1!'
    );

    const submitButton = fixture.debugElement.query(
      By.css('#login-form-button')
    );

    //Try to submit the form to generate all the errors
    submitButton.nativeElement.click();

    expect(component.isFormValid).toBeTrue();
    expect(facade.signInWEmailAndPassword).toHaveBeenCalled();
  });

  it('should mark form as invalid if they are errors', async () => {
    const { component, fixture } = await setup();

    const submitButton = fixture.debugElement.query(By.css('#sign-up-button'));

    //Try to submit the form to generate all the errors
    submitButton.nativeElement.click();

    expect(component.isFormValid).toBeFalse();
  });

  it('should be able to sign up with Google', fakeAsync(async () => {
    const { component, fixture } = await setup();

    spyOn(component, 'onGoogleSignIn');

    const button = fixture.debugElement.query(By.css('#google-sign-up-button'));

    //Try to submit the form to generate all the errors
    button.nativeElement.click();

    expect(component.onGoogleSignIn).toHaveBeenCalled();
  }));

  it('should be able to trigger facade sign up with Google', fakeAsync(async () => {
    const { component, facade } = await setup();

    component.onGoogleSignIn();

    expect(facade.signInWGoogle).toHaveBeenCalled();
  }));

  it('should be able to sign up with Github', fakeAsync(async () => {
    const { component, fixture } = await setup();

    spyOn(component, 'onGithubSignIn');

    const button = fixture.debugElement.query(By.css('#github-sign-up-button'));

    button.nativeElement.click();

    expect(component.onGithubSignIn).toHaveBeenCalled();
  }));

  it('should be able to trigger face sign up with Github', fakeAsync(async () => {
    const { component, facade } = await setup();

    component.onGithubSignIn();

    expect(facade.signInWGithub).toHaveBeenCalled();
  }));
});
