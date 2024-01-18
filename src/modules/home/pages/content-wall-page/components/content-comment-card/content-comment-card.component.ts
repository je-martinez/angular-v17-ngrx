import { DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';
import { PostComment } from '@modules/home/types/content-wall.types';

@Component({
  selector: 'content-comment-card',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './content-comment-card.component.html',
  styleUrl: './content-comment-card.component.scss'
})
@Flowbite()
export class ContentCommentCardComponent {
  @Input() showTopDivider: boolean = true;
  @Input({ required: true }) comment!: PostComment;

  public get avatar() {
    return this.comment.avatar;
  }

  public get email() {
    return this.comment.email;
  }

  public get body() {
    return this.comment.body;
  }

  public get createdAt() {
    return this.comment.createdAt;
  }
}
