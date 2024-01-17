import { Component } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { PostCommentCardComponent } from '../post-comment-card/post-comment-card.component';

@Component({
  selector: 'post-comments-modal',
  standalone: true,
  imports: [PostCommentCardComponent],
  templateUrl: './post-comments-modal.component.html',
  styleUrl: './post-comments-modal.component.scss'
})
@Flowbite()
export class PostCommentsModalComponent {}
