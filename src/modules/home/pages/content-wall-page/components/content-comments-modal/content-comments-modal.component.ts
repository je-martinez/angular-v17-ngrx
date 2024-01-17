import { Component } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { ContentCommentCardComponent } from '../content-comment-card/content-comment-card.component';
import { ContentFacade } from '@store/modules/content/content.facade';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'content-comments-modal',
  standalone: true,
  imports: [ContentCommentCardComponent, AsyncPipe, NgIf],
  templateUrl: './content-comments-modal.component.html',
  styleUrl: './content-comments-modal.component.scss'
})
@Flowbite()
export class ContentCommentsModalComponent {
  constructor(private readonly contentFacade: ContentFacade) {}

  public get comments$() {
    return this.contentFacade.contentById$.pipe(
      map((content) => content?.comments ?? [])
    );
  }

  public isFirstOrLastComment(index: number, length: number) {
    if (index === 0) {
      return true;
    }

    if (index === length - 1) {
      return true;
    }

    return false;
  }
}
