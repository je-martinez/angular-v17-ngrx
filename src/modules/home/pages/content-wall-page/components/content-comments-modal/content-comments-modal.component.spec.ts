import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCommentsModalComponent } from './content-comments-modal.component';

describe('ContentCommentsModalComponent', () => {
  let component: ContentCommentsModalComponent;
  let fixture: ComponentFixture<ContentCommentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCommentsModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
