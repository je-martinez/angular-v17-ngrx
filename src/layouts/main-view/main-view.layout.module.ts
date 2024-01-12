import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainViewLayoutComponent } from './components/main-view-layout/main-view-layout.component';
import { RouterModule } from '@angular/router';
import { AuthStoreModule } from 'src/store/modules/auth/auth.store.module';

@NgModule({
  declarations: [MainViewLayoutComponent],
  imports: [RouterModule, CommonModule, AuthStoreModule]
})
export class MainViewLayoutModule {}
