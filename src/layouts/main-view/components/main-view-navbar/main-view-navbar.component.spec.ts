import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewNavbarComponent } from './main-view-navbar.component';

describe('MainViewNavbarComponent', () => {
  let component: MainViewNavbarComponent;
  let fixture: ComponentFixture<MainViewNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainViewNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainViewNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
