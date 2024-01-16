import { NgModule } from '@angular/core';
import { ContentWallPageComponent } from './content-wall-page.component';
import { ContentModule } from '@store/modules/content/content.module';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { CommonModule } from '@angular/common';
import { ContentCardSkeletonComponent } from './components/content-card-skeleton/content-card-skeleton.component';

@NgModule({
  declarations: [ContentWallPageComponent],
  imports: [
    ContentModule,
    ContentCardComponent,
    ContentCardSkeletonComponent,
    CommonModule
  ]
})
export class ContentWallPageModule {}
