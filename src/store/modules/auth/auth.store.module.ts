import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';

@NgModule({
  providers: [AuthFacade],
  imports: [
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthStoreModule {}
