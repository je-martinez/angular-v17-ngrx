import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockFlowbiteComponent } from './mock-flowbite.component';

describe('MockFlowbiteComponent', () => {
  let component: MockFlowbiteComponent;
  let fixture: ComponentFixture<MockFlowbiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockFlowbiteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MockFlowbiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create mock component with decorator', () => {
    expect(component).toBeTruthy();
  });
});
