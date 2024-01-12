import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainViewLayoutComponent } from './components/main-view-layout/main-view-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainViewLayoutComponent],
  imports: [RouterModule, CommonModule]
})
export class MainViewLayoutModule {}
