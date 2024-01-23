import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorMessageComponent } from './form-error-message.component';
import { By } from '@angular/platform-browser';

describe('FormErrorMessageComponent', () => {
  let component: FormErrorMessageComponent;
  let fixture: ComponentFixture<FormErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormErrorMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FormErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a element with the input message', () => {
    const message = 'test message';
    component.message = message;
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('#error-message'));
    expect(element.nativeElement.textContent).toContain(message);
  });
});
