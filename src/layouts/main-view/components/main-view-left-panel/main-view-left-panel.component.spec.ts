import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewLeftPanelComponent } from './main-view-left-panel.component';

describe('MainViewLeftPanelComponent', () => {
  let component: MainViewLeftPanelComponent;
  let fixture: ComponentFixture<MainViewLeftPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainViewLeftPanelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainViewLeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
