import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Flowbite } from '@infrastructure/decorators/flowbite';

@Component({
  selector: 'content-comment-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './content-comment-card.component.html',
  styleUrl: './content-comment-card.component.scss'
})
@Flowbite()
export class ContentCommentCardComponent {
  @Input() showTopDivider: boolean = true;
}
