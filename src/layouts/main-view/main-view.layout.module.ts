import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainViewLayoutComponent } from './components/main-view-layout/main-view-layout.component';
import { AuthStoreModule } from '@store/modules/auth/auth.store.module';

@NgModule({
  declarations: [MainViewLayoutComponent],
  imports: [RouterModule, CommonModule, AuthStoreModule]
})
export class MainViewLayoutModule {}
