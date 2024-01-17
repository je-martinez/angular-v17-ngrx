import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewFooterComponent } from './main-view-footer.component';

describe('MainViewFooterComponent', () => {
  let component: MainViewFooterComponent;
  let fixture: ComponentFixture<MainViewFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainViewFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainViewFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
