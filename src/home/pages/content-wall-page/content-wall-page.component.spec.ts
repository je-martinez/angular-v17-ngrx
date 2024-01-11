import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWallPageComponent } from './content-wall-page.component';

describe('ContentWallPageComponent', () => {
  let component: ContentWallPageComponent;
  let fixture: ComponentFixture<ContentWallPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentWallPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentWallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
