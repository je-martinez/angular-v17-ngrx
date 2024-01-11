import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { AuthFacade } from './auth.facade';
import { authFeature } from './auth.reducer';

@NgModule({
  providers: [AuthFacade],
  imports: [
    StoreModule.forFeature({
      name: authFeature.name,
      reducer: authFeature.reducer
    }),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthStoreModule {}
