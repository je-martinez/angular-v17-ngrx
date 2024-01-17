import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { Content } from '@modules/home/types/content-wall.types';
import { ContentFacade } from '@store/modules/content/content.facade';
import { Modal } from 'flowbite';
import { map } from 'rxjs/operators';
import { ContentCommentCardComponent } from '../content-comment-card/content-comment-card.component';

@Component({
  selector: 'content-comments-modal',
  standalone: true,
  imports: [ContentCommentCardComponent, AsyncPipe, NgIf],
  templateUrl: './content-comments-modal.component.html',
  styleUrl: './content-comments-modal.component.scss'
})
@Flowbite()
export class ContentCommentsModalComponent {
  @Input({ required: true }) modalInstance: Modal | undefined = undefined;
  constructor(private readonly contentFacade: ContentFacade) {}

  public get comments$() {
    return this.contentFacade.contentById$.pipe(
      map((content) => content?.comments ?? [])
    );
  }

  showModal() {
    this.modalInstance?.show();
  }

  hideModal() {
    this.modalInstance?.hide();
  }

  public selectContent(content: Content) {
    this.modalInstance?.show();
    this.contentFacade.getContentById(content.id);
  }

  public isFirstOrLastComment(index: number) {
    if (index === 0) {
      return true;
    }
    return false;
  }
}
