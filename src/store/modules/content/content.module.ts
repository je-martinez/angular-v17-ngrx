import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ContentEffects } from './content.effects';
import { ContentFacade } from './content.facade.service';
import { contentFeature } from './content.reducer';

@NgModule({
  providers: [ContentFacade],
  imports: [
    StoreModule.forFeature(contentFeature),
    EffectsModule.forFeature([ContentEffects])
  ]
})
export class ContentModule {}
