import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCommentsModalComponent } from './content-comments-modal.component';
import { ContentModule } from '@store/modules/content/content.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

describe('ContentCommentsModalComponent', () => {
  let component: ContentCommentsModalComponent;
  let fixture: ComponentFixture<ContentCommentsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContentCommentsModalComponent,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        ContentModule,
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentCommentsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
