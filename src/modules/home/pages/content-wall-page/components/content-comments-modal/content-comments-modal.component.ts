import { Component } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { ContentCommentCardComponent } from '../content-comment-card/content-comment-card.component';

@Component({
  selector: 'content-comments-modal',
  standalone: true,
  imports: [ContentCommentCardComponent],
  templateUrl: './content-comments-modal.component.html',
  styleUrl: './content-comments-modal.component.scss'
})
@Flowbite()
export class ContentCommentsModalComponent {}
