import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarComponent } from './progress-bar.component';
import { By } from '@angular/platform-browser';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('color should be bg-neutral-500', () => {
    const element = fixture.debugElement.query(By.css('#progress-bar'));
    const classesArray: string[] = Array.from(element.nativeElement.classList);
    const initialValue = 'bg-neutral-500';
    expect(classesArray.includes(initialValue)).toBeTruthy();
    expect(component.color).toBe(initialValue);
  });

  it('color should be able to change based on input', () => {
    const inputValue = 'bg-neutral-500';
    component.color = inputValue;
    const element = fixture.debugElement.query(By.css('#progress-bar'));
    const classesArray: string[] = Array.from(element.nativeElement.classList);
    expect(classesArray.includes(inputValue)).toBeTruthy();
    expect(component.color).toBe(inputValue);
  });
});
