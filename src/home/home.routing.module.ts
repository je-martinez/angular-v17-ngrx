import { NgModule } from '@angular/core';
import { ContentWallPageComponent } from './pages/content-wall-page/content-wall-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'content-wall',
    component: ContentWallPageComponent,
    title: 'Content Wall'
  },
  {
    path: '',
    redirectTo: 'content-wall',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule {}
