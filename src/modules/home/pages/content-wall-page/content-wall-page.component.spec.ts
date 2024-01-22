import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { generateMockContentFacade } from '@mocks/facades/content.facade.mock';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContentFacade } from '@store/modules/content/content.facade';
import { ContentModule } from '@store/modules/content/content.module';
import { ContentCardSkeletonComponent } from './components/content-card-skeleton/content-card-skeleton.component';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { ContentCommentsModalComponent } from './components/content-comments-modal/content-comments-modal.component';
import { ContentWallPageComponent } from './content-wall-page.component';

describe('ContentWallPageComponent', () => {
  const setup = async ({ loading = false }) => {
    const facade = generateMockContentFacade({ loading });
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
      ],
      providers: [{ provide: ContentFacade, useValue: facade }]
    }).compileComponents();

    const fixture = TestBed.createComponent(ContentWallPageComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component, facade };
  };

  it('should create', async () => {
    const { component } = await setup({ loading: false });
    expect(component).toBeTruthy();
  });

  it('should render skeletons if loading is actived', async () => {
    const { component, fixture } = await setup({ loading: true });

    const skeletons = fixture.debugElement.queryAll(
      By.directive(ContentCardSkeletonComponent)
    );

    expect(component.skeletonItems.length).toEqual(skeletons?.length);
  });

  it('should only instance Modal once', fakeAsync(async () => {
    const { component, fixture } = await setup({ loading: true });

    tick(1000);

    const instance = component.modal;

    //Trigger lifecyle hook
    component.ngAfterViewInit();
    fixture.detectChanges();

    tick(1000);

    //Instance should be the same
    expect(instance).toBe(component.modal);
  }));
});
