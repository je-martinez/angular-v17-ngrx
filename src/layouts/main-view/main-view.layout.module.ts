import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainViewLayoutComponent } from './components/main-view-layout/main-view-layout.component';
import { AuthStoreModule } from '@store/modules/auth/auth.store.module';
import { ToastProviderComponent } from '@shared/ui/components/toast-provider/toast-provider.component';
import { MainViewLeftPanelComponent } from './components/main-view-left-panel/main-view-left-panel.component';
import { MainViewFooterComponent } from './components/main-view-footer/main-view-footer.component';
import { MainViewNavbarComponent } from './components/main-view-navbar/main-view-navbar.component';

@NgModule({
  declarations: [MainViewLayoutComponent],
  imports: [
    RouterModule,
    CommonModule,
    AuthStoreModule,
    ToastProviderComponent,
    MainViewNavbarComponent,
    MainViewLeftPanelComponent,
    MainViewFooterComponent
  ]
})
export class MainViewLayoutModule {}
