import { NgModule } from '@angular/core';
import { ContentWallPageModule } from './pages/content-wall-page/content-wall-page.module';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  imports: [
    HomeRoutingModule,
    ContentWallPageModule,
  ]
})
export class HomeModule { }
