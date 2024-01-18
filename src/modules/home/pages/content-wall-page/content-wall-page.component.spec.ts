import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentWallPageComponent } from './content-wall-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { ContentModule } from '@store/modules/content/content.module';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { ContentCardSkeletonComponent } from './components/content-card-skeleton/content-card-skeleton.component';
import { ContentCommentsModalComponent } from './components/content-comments-modal/content-comments-modal.component';
import { HttpClientModule } from '@angular/common/http';

describe('ContentWallPageComponent', () => {
  let component: ContentWallPageComponent;
  let fixture: ComponentFixture<ContentWallPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContentWallPageComponent],
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        ContentModule,
        ContentCardComponent,
        ContentCardSkeletonComponent,
        ContentCommentsModalComponent,
        CommonModule,
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentWallPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
