import { NgModule } from '@angular/core';
import { ContentWallPageComponent } from './pages/content-wall-page/content-wall-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MainViewLayoutComponent } from 'src/layouts/main-view/components/main-view-layout/main-view-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainViewLayoutComponent,
    children: [
      {
        path: 'content-wall',
        component: ContentWallPageComponent,
        title: 'Content Wall'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule {}
