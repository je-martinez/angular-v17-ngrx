import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewLayoutComponent } from './main-view-layout.component';

describe('MainViewLayoutComponent', () => {
  let component: MainViewLayoutComponent;
  let fixture: ComponentFixture<MainViewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainViewLayoutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainViewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
