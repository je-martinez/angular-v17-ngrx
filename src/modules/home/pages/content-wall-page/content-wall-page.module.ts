import { NgModule } from '@angular/core';
import { ContentWallPageComponent } from './content-wall-page.component';
import { ContentModule } from '@store/modules/content/content.module';

@NgModule({
  declarations: [ContentWallPageComponent],
  imports: [ContentModule]
})
export class ContentWallPageModule {}
