import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCommentsModalComponent } from './content-comments-modal.component';
import { ContentModule } from '@store/modules/content/content.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ContentFacade } from '@store/modules/content/content.facade';
import { generateMockContentFacade } from '@mocks/facades/content.facade.mock';

describe('ContentCommentsModalComponent', () => {
  let component: ContentCommentsModalComponent;
  let fixture: ComponentFixture<ContentCommentsModalComponent>;
  let facade: ContentFacade;

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
