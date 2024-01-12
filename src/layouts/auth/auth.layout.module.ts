import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { LogoInteractionComponent } from './components/logo-interaction/logo-interaction.component';

@NgModule({
  declarations: [AuthLayoutComponent, LogoInteractionComponent],
  imports: [RouterModule]
})
export class AuthLayoutModule {}
