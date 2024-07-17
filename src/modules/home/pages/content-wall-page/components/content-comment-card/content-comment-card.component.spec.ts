import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCommentCardComponent } from './content-comment-card.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '@env/environment';
import { mockComments } from '@mocks/data/comments.mock';

describe('ContentCommentCardComponent', () => {
  let component: ContentCommentCardComponent;
  let fixture: ComponentFixture<ContentCommentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentCommentCardComponent],
      providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentCommentCardComponent);
    component = fixture.componentInstance;
    component.comment = mockComments[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
