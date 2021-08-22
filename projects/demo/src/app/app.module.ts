import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NbDatepickerModule,
  NbThemeModule,
  NbLayoutModule,
  NbInputModule,
  NbLayoutDirection,
} from '@nebular/theme';
import { NebularJalaliMomentModule } from '../../../lib/src/nebular-jalali-moment.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'default'}, [], [], NbLayoutDirection.RTL),
    NbDatepickerModule.forRoot(),
    NbLayoutModule,
    NbInputModule,
    NebularJalaliMomentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
