import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoUserLoggedGuard } from '@infrastructure/guards/no-user-logged.guard';
import { UserLoggedGuard } from '@infrastructure/guards/user-logged.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [NoUserLoggedGuard],
    loadChildren: () =>
      import('src/modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'home',
    canActivate: [UserLoggedGuard],
    loadChildren: () =>
      import('src/modules/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: '',
    redirectTo: 'auth/sign-up',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth/sign-up',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
