import { NgModule } from '@angular/core';
import { ContentWallPageComponent } from './content-wall-page.component';
import { ContentStoreModule } from '@store/modules/content/content.store.module';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { CommonModule } from '@angular/common';
import { ContentCardSkeletonComponent } from './components/content-card-skeleton/content-card-skeleton.component';
import { ContentCommentsModalComponent } from './components/content-comments-modal/content-comments-modal.component';

@NgModule({
  declarations: [ContentWallPageComponent],
  imports: [
    ContentStoreModule,
    ContentCardComponent,
    ContentCardSkeletonComponent,
    ContentCommentsModalComponent,
    CommonModule
  ]
})
export class ContentWallPageModule {}
