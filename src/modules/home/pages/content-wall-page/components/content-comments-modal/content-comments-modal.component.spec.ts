import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContentModule } from '@store/modules/content/content.module';
import { ContentCommentsModalComponent } from './content-comments-modal.component';

describe('ContentCommentsModalComponent', () => {
  let component: ContentCommentsModalComponent;
  let fixture: ComponentFixture<ContentCommentsModalComponent>;

  beforeEach(async () => {
    // facade = generateMockContentFacade();

    await TestBed.configureTestingModule({
      // providers: [{ provide: ContentFacade, useValue: facade }],
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
