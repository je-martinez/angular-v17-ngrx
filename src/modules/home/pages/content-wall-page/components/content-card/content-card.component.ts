import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Content } from '@modules/home/types/content-wall.types';
import { timeAgo } from '@shared/utils/date.utils';

@Component({
  selector: 'content-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss'
})
export class ContentCardComponent {
  @Input({ required: true }) content: Content | undefined;

  constructor() {}

  public get avatar() {
    return this.content?.user?.avatar ?? '';
  }

  public get name() {
    return this.content?.user?.name ?? '';
  }

  public get title() {
    return this.content?.title ?? '';
  }

  public get body() {
    return this.content?.body ?? '';
  }

  public get commentsCount() {
    return this.content?.comments?.length ?? 0;
  }

  public get time() {
    return this.content?.createdAt ? timeAgo(this.content?.createdAt) : '';
  }
}
