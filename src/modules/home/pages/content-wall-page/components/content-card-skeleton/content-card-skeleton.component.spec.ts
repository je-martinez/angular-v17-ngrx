import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCardSkeletonComponent } from './content-card-skeleton.component';

describe('ContentCardSkeletonComponent', () => {
  let component: ContentCardSkeletonComponent;
  let fixture: ComponentFixture<ContentCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCardSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
