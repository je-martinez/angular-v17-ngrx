import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from 'src/pages/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    //Modules
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
