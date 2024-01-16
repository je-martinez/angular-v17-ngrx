import { NgModule } from '@angular/core';
import { ContentWallPageComponent } from './content-wall-page.component';
import { ContentModule } from '@store/modules/content/content.module';
import { ContentCardComponent } from './components/content-card/content-card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ContentWallPageComponent],
  imports: [ContentModule, ContentCardComponent, CommonModule]
})
export class ContentWallPageModule {}
