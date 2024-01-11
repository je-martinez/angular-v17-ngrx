import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedGuard } from 'src/infrastructure/guards/user-logged.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('src/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'home',
    canActivateChild: [UserLoggedGuard],
    loadChildren: () => import('src/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: '',
    redirectTo: 'auth/sign-up',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
