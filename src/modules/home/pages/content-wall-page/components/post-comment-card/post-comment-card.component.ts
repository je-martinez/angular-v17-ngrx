import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';

@Component({
  selector: 'post-comment-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './post-comment-card.component.html',
  styleUrl: './post-comment-card.component.scss'
})
@Flowbite()
export class PostCommentCardComponent {
  @Input() showTopDivider: boolean = true;
}
