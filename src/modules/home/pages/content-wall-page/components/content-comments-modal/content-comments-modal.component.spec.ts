import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { mockContent } from '@mocks/data/content.mock';
import { generateMockContentFacade } from '@mocks/facades/content.facade.mock';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContentFacade } from '@store/modules/content/content.facade';
import { ContentModule } from '@store/modules/content/content.module';
import { Modal } from 'flowbite';
import { ContentCommentCardComponent } from '../content-comment-card/content-comment-card.component';
import { ContentCommentsModalComponent } from './content-comments-modal.component';
import { Content, PostComment } from '@modules/home/types/content-wall.types';
import { take } from 'rxjs';

describe('ContentCommentsModalComponent', () => {
  const setup = async ({ customContentById = mockContent[0] }) => {
    const dummyElement = document.createElement('div');
    const modalInstance = new Modal(dummyElement, {}, {});

    const facade = generateMockContentFacade({
      loading: false,
      customContentById
    });

    await TestBed.configureTestingModule({
      imports: [
        ContentCommentsModalComponent,
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        ContentModule,
        ContentCommentCardComponent,
        CommonModule,
        HttpClientModule
      ],
      providers: [{ provide: ContentFacade, useValue: facade }]
    }).compileComponents();

    const fixture = TestBed.createComponent(ContentCommentsModalComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    return { fixture, component, facade, modalInstance };
  };

  beforeEach(async () => {});

  it('should create', async () => {
    const { component } = await setup({});
    expect(component).toBeTruthy();
  });

  it('should create', fakeAsync(async () => {
    const customContentById: Content = {
      ...mockContent[0]
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customContentById.comments = undefined as any;
    const { component } = await setup({
      customContentById
    });

    let comments: PostComment[] | undefined = undefined;

    component.comments$.pipe(take(1)).subscribe((commentsResponse) => {
      comments = commentsResponse;
    });

    tick(1000);

    expect(comments).toBeDefined();
  }));

  it('should trigger facade on selectContent method', fakeAsync(async () => {
    const { component, modalInstance, fixture, facade } = await setup({});

    component.modalInstance = modalInstance;

    fixture.detectChanges();

    spyOn(component.modalInstance, 'show');

    tick();

    component.selectContent({ ...mockContent[0] });

    expect(component.modalInstance.show).toHaveBeenCalled();
    expect(facade.getContentById).toHaveBeenCalled();
  }));

  it('should trigger show method on Modal Instance when showModal method is called', fakeAsync(async () => {
    const { component, modalInstance, fixture } = await setup({});

    component.modalInstance = modalInstance;

    fixture.detectChanges();

    tick();

    spyOn(component.modalInstance, 'show');

    component.showModal();

    fixture.detectChanges();

    expect(component.modalInstance.show).toHaveBeenCalled();
  }));

  it('should trigger hide method on Modal Instance when hideModal method is called', fakeAsync(async () => {
    const { component, modalInstance, fixture } = await setup({});

    component.modalInstance = modalInstance;

    fixture.detectChanges();

    tick();

    spyOn(component.modalInstance, 'hide');

    component.hideModal();

    fixture.detectChanges();

    expect(component.modalInstance.hide).toHaveBeenCalled();
  }));

  it('should trigger facade on selectContent method', fakeAsync(async () => {
    const { component, modalInstance, fixture, facade } = await setup({});

    component.modalInstance = modalInstance;

    fixture.detectChanges();

    spyOn(component.modalInstance, 'show');

    tick();

    component.selectContent({ ...mockContent[0] });

    expect(component.modalInstance.show).toHaveBeenCalled();
    expect(facade.getContentById).toHaveBeenCalled();
  }));
});
