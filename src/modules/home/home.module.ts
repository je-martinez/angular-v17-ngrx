import { NgModule } from '@angular/core';
import { ContentWallPageModule } from './pages/content-wall-page/content-wall-page.module';
import { HomeRoutingModule } from './home.routing.module';
import { MainViewLayoutModule } from '@layouts/main-view/main-view.layout.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    MainViewLayoutModule,
    HomeRoutingModule,
    HttpClientModule,
    ContentWallPageModule
  ]
})
export class HomeModule {}
