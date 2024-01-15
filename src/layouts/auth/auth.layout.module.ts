import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LogoInteractionComponent } from './components/logo-interaction/logo-interaction.component';
import { ProgressBarComponent } from 'src/shared/ui/components/progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthLayoutComponent, LogoInteractionComponent],
  imports: [RouterModule, CommonModule, ProgressBarComponent]
})
export class AuthLayoutModule {}
