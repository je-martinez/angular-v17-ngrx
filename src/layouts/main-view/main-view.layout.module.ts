import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainViewLayoutComponent } from './components/main-view-layout/main-view-layout.component';
import { AuthStoreModule } from '@store/modules/auth/auth.store.module';
import { ToastProviderComponent } from '@shared/ui/components/toast-provider/toast-provider.component';

@NgModule({
  declarations: [MainViewLayoutComponent],
  imports: [RouterModule, CommonModule, AuthStoreModule, ToastProviderComponent]
})
export class MainViewLayoutModule {}
