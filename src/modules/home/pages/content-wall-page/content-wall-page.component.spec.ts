import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ContentWallPageComponent } from './content-wall-page.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { ContentModule } from '@store/modules/content/content.module';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { ContentCardSkeletonComponent } from './components/content-card-skeleton/content-card-skeleton.component';
import { ContentCommentsModalComponent } from './components/content-comments-modal/content-comments-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentFacade } from '@store/modules/content/content.facade';
import { generateMockContentFacade } from '@mocks/facades/content.facade.mock';
import { By } from '@angular/platform-browser';
import { ModalUtils } from '@modules/home/utils/modal.utils';
import { mockContent } from '@mocks/data/content.mock';
import { Modal, ModalOptions } from 'flowbite';

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

  it('should only set Modal instance if this utility returns a valid instance', fakeAsync(async () => {
    spyOn(ModalUtils, 'getModalInstancebyId').and.returnValue(null);

    const { component } = await setup({ loading: true });

    tick(1000);

    //Should be null since instance is not valid
    expect(component.modal).toBeFalsy();
  }));

  it('should select content when the button comments is clicked', fakeAsync(async () => {
    const { component, fixture } = await setup({ loading: false });

    spyOn(component, 'selectContent');

    const button = fixture.debugElement.query(
      By.css('#content-comments-button')
    );

    button.nativeElement.click();

    tick();

    expect(component.selectContent).toHaveBeenCalled();
  }));

  it('should select content when the button comments is clicked', fakeAsync(async () => {
    const { component, facade } = await setup({ loading: false });

    tick(1000);
    spyOn(component?.modal as Modal, 'show');

    const content = { ...mockContent[0] };

    component.selectContent(content);

    expect(component?.modal?.show).toHaveBeenCalled();
    expect(facade.getContentById).toHaveBeenCalled();
  }));

  it('should trigger clear content method when the button comments is clicked', fakeAsync(async () => {
    const { component, fixture } = await setup({ loading: false });

    //Wait for after view init
    tick(1000);

    spyOn(
      (component?.modal as Modal)?._options as ModalOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'onHide' as any
    );

    const content = { ...mockContent[0] };

    component.selectContent(content);
    fixture.detectChanges();

    //Wait before close modal
    tick(1000);
    const closeButton = fixture.debugElement.query(By.css('#close-modal'));
    closeButton.nativeElement.click();

    fixture.detectChanges();
    tick(1000);

    expect(component?.modal?._options?.onHide).toHaveBeenCalled();
  }));

  it('should call facade when clear content method is triggered', fakeAsync(async () => {
    const { component, fixture, facade } = await setup({ loading: false });
    tick(1000);

    component.clearContentSelected();
    fixture.detectChanges();

    tick();

    expect(facade.clearContentById).toHaveBeenCalled();
  }));
});
