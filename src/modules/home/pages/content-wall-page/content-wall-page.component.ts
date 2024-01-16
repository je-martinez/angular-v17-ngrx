import { Component, OnInit } from '@angular/core';
import { ContentFacade } from '@store/modules/content/content.facade';

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
  }

  public get allContentAvailable$() {
    return this.contentFacade.content$;
  }

  public get loading() {
    return this.contentFacade.showLoadingContent$;
  }
}
