import { Component, OnInit } from '@angular/core';
import { Content } from '@modules/home/types/content-wall.types';
import { ContentFacade } from '@store/modules/content/content.facade';
import { Modal } from 'flowbite';

@Component({
  selector: 'content-wall-page',
  templateUrl: './content-wall-page.component.html',
  styleUrl: './content-wall-page.component.scss'
})
export class ContentWallPageComponent implements OnInit {
  constructor(private readonly contentFacade: ContentFacade) {}

  ngOnInit(): void {
    this.contentFacade.getPosts();
    this.contentFacade.getComments();
    this.contentFacade.getUsers();
    this.setupModalInstanceEvents();
  }

  public setupModalInstanceEvents() {
    const $targetEl = document.getElementById('content-comments-modal');
    const instanceOptions = {
      id: 'content-comments-modal',
      override: true
    };
    const options = {
      onHide: () => {
        this.contentFacade.clearContentById();
      }
    };
    new Modal($targetEl, options, instanceOptions);
  }

  public get allContentAvailable$() {
    return this.contentFacade.content$;
  }

  public get loading() {
    return this.contentFacade.showLoadingContent$;
  }

  public selectContent(content: Content) {
    this.contentFacade.getContentById(content.id);
  }
}
