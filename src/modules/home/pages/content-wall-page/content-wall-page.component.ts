import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Content } from '@modules/home/types/content-wall.types';
import { ContentFacade } from '@store/modules/content/content.facade';
import { Modal } from 'flowbite';
import { ModalUtils } from '@modules/home/utils/modal.utils';

@Component({
  selector: 'content-wall-page',
  templateUrl: './content-wall-page.component.html',
  styleUrl: './content-wall-page.component.scss'
})
export class ContentWallPageComponent implements OnInit, AfterViewInit {
  private modalInstance: Modal | undefined = undefined;
  constructor(private readonly contentFacade: ContentFacade) {}

  ngOnInit(): void {
    this.contentFacade.getPosts();
    this.contentFacade.getComments();
    this.contentFacade.getUsers();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setupModalInstanceEvents();
    }, 0);
  }

  public get skeletonItems() {
    const n = 20;
    return Array(n).fill(n);
  }

  public get modal() {
    return this.modalInstance;
  }

  public get allContentAvailable$() {
    return this.contentFacade.content$;
  }

  public get loading() {
    return this.contentFacade.showLoadingContent$;
  }

  public setupModalInstanceEvents() {
    if (this.modalInstance) {
      return;
    }
    const newInstance = ModalUtils.getModalInstancebyId(
      'content-comments-modal',
      {
        onHide: () => {
          this.contentFacade.clearContentById();
        }
      }
    );
    if (!newInstance) {
      return;
    }
    this.modalInstance = newInstance;
  }

  public selectContent(content: Content) {
    this.modalInstance?.show();
    this.contentFacade.getContentById(content.id);
  }
}
