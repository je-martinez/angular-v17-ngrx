import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCommentCardComponent } from './content-comment-card.component';

describe('ContentCommentCardComponent', () => {
  let component: ContentCommentCardComponent;
  let fixture: ComponentFixture<ContentCommentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCommentCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentCommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
