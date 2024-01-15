import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoInteractionComponent } from './logo-interaction.component';

describe('LogoInteractionComponent', () => {
  let component: LogoInteractionComponent;
  let fixture: ComponentFixture<LogoInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoInteractionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
