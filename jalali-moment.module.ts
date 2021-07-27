import { NgModule } from '@angular/core';

import { NbDateService } from '@nebular/theme';
import { JalaliMomentDateService } from './services/jalali-moment-date.service';


@NgModule({
  providers: [{ provide: NbDateService, useClass: JalaliMomentDateService }],
})
export class JalaliMomentDateModule {
}
