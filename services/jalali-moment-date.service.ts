import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { TranslationWidth } from '@angular/common';

import { NbDateService } from '@nebular/theme';

import * as _moment from 'jalali-moment';
// @ts-ignore
import { default as _rollupMoment, LongDateFormatKey, Moment } from 'jalali-moment';

const moment = _rollupMoment || _moment;

@Injectable()
export class JalaliMomentDateService extends NbDateService<Moment> {
  protected localeData: {
    firstDayOfWeek: number,
    defaultFormat: string,
    months: { [key: string]: string[] },
    days: { [key: string]: string[] },
  };

  protected readonly TIME_ONLY_FORMAT_KEY: LongDateFormatKey = 'LT';
  constructor(@Inject(LOCALE_ID) locale: string) {
    super();
    this.setLocale('fa');
    // this.setLocale(locale);
  }

  setLocale(locale: string) {
    super.setLocale(locale);
    this.setMomentLocaleData(locale);
  }

  setHours(date: Moment, hour: number): Moment {
    return this.clone(date).set({ hour });
  }

  setMinutes(date: Moment, minute: number): Moment {
    return this.clone(date).set({ minute });
  }

  setSeconds(date: Moment, second: number): Moment {
    return this.clone(date).set({ second });
  }

  setMilliseconds(date: Moment, milliseconds: number): Moment {
    return this.clone(date).set({ milliseconds });
  }

  addDay(date: Moment, days: number): Moment {
    return this.clone(date).add({ days });
  }

  addMonth(date: Moment, months: number): Moment {
    return this.clone(date).add(months, 'jMonth');
  }

  addYear(date: Moment, years: number): Moment {
    return this.clone(date).add({ years });
  }

  addMinutes(date: Moment, minute: number): Moment {
    return this.clone(date).add({ minute });
  }

  addHours(date: Moment, hour: number): Moment {
    return this.clone(date).add({ hour });
  }

  clone(date: Moment): Moment {
    if (!date) {
      return null;
    }

    let dateMoment;
    if (!date.clone) {
      dateMoment = moment(date);
      if (this.getYear(dateMoment) < 1000)  {
        dateMoment = moment(date, this.localeData.defaultFormat).locale('fa');
      }
    } else {
      dateMoment = date.clone();
    }
    // if (dateMoment && this.locale || true) {
    //     dateMoment.locale(this.locale || 'fa');
    // }

    dateMoment?.locale('fa', { useGregorianParser: true });
    return dateMoment;
  }

  valueOf(date: Moment): number {
    return date.valueOf();
  }

  compareDates(date1: Moment, date2: Moment): number {
    return (
      this.getYear(date1) - this.getYear(date2) ||
      this.getMonth(date1) - this.getMonth(date2) ||
      this.getDate(date1) - this.getDate(date2)
    );
  }

  createDate(year: number, month: number, date: number): Moment {
    return moment([year, month + 1, date], this.localeData.defaultFormat);
  }

  format(date: Moment, format: string): string {
    if (date) {
      return this.clone(date).format(format || this.localeData.defaultFormat);
    }

    return '';
  }

  getLocaleTimeFormat(): string {
    return moment.localeData().longDateFormat(this.TIME_ONLY_FORMAT_KEY);
  }

  getDate(date: Moment): number {
    return this.clone(date).date();
  }

  getDayOfWeek(date: Moment): number {
    return this.clone(date).day();
  }

  getDayOfWeekNames(style: TranslationWidth = TranslationWidth.Narrow): string[] {
    return this.localeData.days[style];
  }

  getFirstDayOfWeek(): number {
    return this.localeData.firstDayOfWeek;
  }

  getMonth(date: Moment): number {
    return this.clone(date).month();
  }

  getHours(date: Moment): number {
    return this.clone(date).hour();
  }

  getMinutes(date: Moment): number {
    return this.clone(date).minute();
  }

  getSeconds(date: Moment): number {
    return this.clone(date).second();
  }

  getMilliseconds(date: Moment): number {
    return this.clone(date).milliseconds();
  }

  getMonthEnd(date: Moment): Moment {
    return this.clone(date).endOf('month');
  }

  getMonthName(date: Moment, style: TranslationWidth = TranslationWidth.Abbreviated): string {
    const month = this.getMonth(date);
    return this.getMonthNameByIndex(month, style);
  }

  getMonthNameByIndex(month: number, style: TranslationWidth = TranslationWidth.Abbreviated): string {
    return this.localeData.months[style][month];
  }

  getMonthStart(date: Moment): Moment {
    return this.clone(date).startOf('month');
  }

  getNumberOfDaysInMonth(date: Moment): number {
    return this.clone(date).daysInMonth();
  }

  getYear(date: Moment): number {
    return this.clone(date).year();
  }

  getYearEnd(date: Moment): Moment {
    return this.clone(date).endOf('year');
  }

  getYearStart(date: Moment): Moment {
    return this.clone(date).startOf('year');
  }

  isSameDay(date1: Moment, date2: Moment): boolean {
    return this.isSameMonth(date1, date2) && this.getDate(date1) === this.getDate(date2);
  }

  isSameMonth(date1: Moment, date2: Moment): boolean {
    return this.isSameYear(date1, date2) && this.getMonth(date1) === this.getMonth(date2);
  }

  isSameYear(date1: Moment, date2: Moment): boolean {
    return this.getYear(date1) === this.getYear(date2);
  }

  isValidDateString(date: string, format: string): boolean {
    return moment(date, format).isValid();
  }

  isValidTimeString(date: string, format: string): boolean {
    return moment(date, format, true).isValid();
  }

  parse(date: string, format: string): Moment {
    // var date = '1400/11/22';
    const year = date.slice(0, 4) || moment().locale('fa').year();
    // console.log('year', year);
    const month = date.slice(5, 7) || moment().locale('fa').month();
    // console.log('month', month);
    const day = date.slice(8, 10) || moment().locale('fa').date();
    // console.log('day', day);
    const normalizeDate = `${year}/${month}/${day}`;
    return moment.from(normalizeDate, 'fa');
    // return moment(date, format);
  }

  today(): Moment {
    return moment().locale('fa');
  }

  getId(): string {
    return 'jalali-moment';
  }

  protected setMomentLocaleData(locale: string) {
    const momentLocaleData = moment.localeData(locale);

    this.localeData = {
      firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
      defaultFormat: momentLocaleData.longDateFormat('L'),
      months: {
        [TranslationWidth.Abbreviated]: momentLocaleData.jMonthsShort(),
        [TranslationWidth.Wide]: momentLocaleData.jMonths(),
      },
      days: {
        [TranslationWidth.Wide]: momentLocaleData.weekdays(),
        [TranslationWidth.Short]: momentLocaleData.weekdaysShort(),
        [TranslationWidth.Narrow]: momentLocaleData.weekdaysMin(),
      },
    };
  }

  getWeekNumber(date: Moment): number {
    return date.locale('fa').week();
  }

  getDateFormat(): string {
    return 'YYYY-MM-DD';
  }

  getTwelveHoursFormat(): string {
    return 'hh:mm A';
  }
}
