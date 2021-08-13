import { NgModule } from '@angular/core';
import { NbDateService } from '@nebular/theme';
import { NebularJalaliMomentService } from './services/nebular-jalali-moment.service';


@NgModule({
  providers: [{ provide: NbDateService, useClass: NebularJalaliMomentService }],
})
export class NebularJalaliMomentModule { }
