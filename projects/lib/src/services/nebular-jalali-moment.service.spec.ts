import { TestBed } from '@angular/core/testing';

import { NbDateService } from '@nebular/theme';
import { NebularJalaliMomentService } from './nebular-jalali-moment.service';
import * as moment from 'jalali-moment';

type Moment = moment.Moment;

describe('NebularJalaliMomentService', () => {
  let dateService: NbDateService<Moment>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dateService = new NebularJalaliMomentService();
  });

  it('should be created', () => {
    const service: NebularJalaliMomentService = TestBed.get(NebularJalaliMomentService);
    expect(service).toBeTruthy();
  });

  it('should validate as correct if date string is valid according to the format', () => {
    const isValid = dateService.isValidDateString('04.23.2018', 'MM.DD.YYYY');
    expect(isValid).toBeTruthy();
  });

  it('should validate as incorrect if date string is invalid according to the format', () => {
    const isValid = dateService.isValidDateString('23.04.2018', 'MM.DD.YYYY');
    expect(isValid).toBeFalsy();
  });

  it('should validate as incorrect if date string is completely incorrect', () => {
    const isValid = dateService.isValidDateString('hello, it is a date string', 'MM.DD.YYYY');
    expect(isValid).toBeFalsy();
  });

  it('should validate as correct if time string is valid according to the hours format', () => {
    const isValid = dateService.isValidTimeString('14:23:00', 'HH:mm:ss');
    expect(isValid).toBeTruthy();
  });

  it('should validate as correct if time string is valid according to the twelve hours format',
    () => {
      const isValid = dateService.isValidTimeString('04:23:00 AM', 'hh:mm:ss A');
      expect(isValid).toBeTruthy();
    });

  it('should validate as incorrect if time string is invalid according to the format', () => {
    const isValid = dateService.isValidTimeString('24:23:00 AM', 'hh:mm:ss A');
    expect(isValid).toBeFalsy();
  });

  it('should validate as incorrect if time string is completely incorrect', () => {
    const isValid = dateService.isValidTimeString('hello, it is a time string', 'hh:mm:ss A');
    expect(isValid).toBeFalsy();
  });

  it('should create today date', () => {
    const today = dateService.today();
    expect(dateService.isSameDay(today, moment())).toBeTruthy();
  });

  it('should get date', () => {
    const date = moment().year(2018).month(5).date(15);
    const jalaliData = date.locale('fa');
    expect(dateService.getDate(date)).toBe(jalaliData.date());
  });

  it('should get month', () => {
    const month = moment().year(2018).month(5).date(15);
    const jalaliData = month.locale('fa');
    expect(dateService.getMonth(month)).toBe(jalaliData.month());
  });

  it('should get hour', () => {
    const hour = moment().year(2018).month(5).date(15).hour(12);
    expect(dateService.getHours(hour)).toBe(12);
  });

  it('should get minute', () => {
    const minute = moment().year(2018).month(5).date(15).hour(12).minute(10);
    expect(dateService.getMinutes(minute)).toBe(10);
  });

  it('should get second', () => {
    const second = moment().year(2018).month(5).date(15).hour(12).minute(10).second(24);
    expect(dateService.getSeconds(second)).toBe(24);
  });

  it('should get milliseconds', () => {
    const second = moment().year(2018).month(5).date(15).hour(12)
      .minute(10).second(24).milliseconds(22);
    expect(dateService.getMilliseconds(second)).toBe(22);
  });

  it('should get year', () => {
    const year = moment().year(2018).month(5).date(15);
    const jalaliData = year.locale('fa');
    expect(dateService.getYear(year)).toBe(jalaliData.year());
  });

  it('should get day of week', () => {
    const date = moment().year(2018).month(8).date(17);
    expect(dateService.getDayOfWeek(date)).toBe(1);
  });

  it('should get first day of week', () => {
    expect(dateService.getFirstDayOfWeek()).toBe(6);
  });

  //todo
  it('should get month name', () => {
    const month = moment().year(2018).month(5).date(15);
    expect(dateService.getMonthName(month)).toBe('خرداد');
  });
  //todo
  it('should get month name by index', () => {
    expect(dateService.getMonthNameByIndex(5)).toBe('شهریور');
  });

  it('should get day of week names', () => {
    expect(dateService.getDayOfWeekNames()).toEqual(['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش']);
  });

  it('should format date according to the MM.DD.YYYY format', () => {
    const date = moment().year(2018).month(5).date(15);
    const jalaliData = date.locale('fa');
    expect(dateService.format(date, 'MM.DD.YYYY')).toBe(jalaliData.format('MM.DD.YYYY'));
  });

  // //todo work with format
  // it('should parse date according to the MM.DD.YYYY format', () => {
  //   const date = '06.15.2018';
  //   const parsed = dateService.parse(date, 'MM.DD.YYYY');
  //   const jalaliData = parsed.locale('fa');
  //   expect(parsed.year()).toEqual(jalaliData.year());
  //   expect(parsed.month()).toEqual(jalaliData.month());
  //   expect(parsed.date()).toEqual(jalaliData.date());
  // });

  // //todo work with format
  // it('should parse date according to the DD.MM.YYYY format', () => {
  //   const date = '15.06.2018';
  //   const parsed = dateService.parse(date, 'DD.MM.YYYY');
  //   const jalaliData = parsed.locale('fa');
  //   expect(parsed.year()).toEqual(jalaliData.year());
  //   expect(parsed.month()).toEqual(jalaliData.month());
  //   expect(parsed.date()).toEqual(jalaliData.date());
  // });

  it('should not format if date isn\'t passed', () => {
    expect(() => dateService.format(undefined!, 'DD.MM.YYYY')).not.toThrow();
    expect(dateService.format(undefined!, 'DD.MM.YYYY')).toEqual('');
  });

  it('should get year end', () => {
    const date = moment().year(2018).month(5).date(15);
    const yearEnd = dateService.getYearEnd(date);
    const jalaliData = date.locale('fa').endOf('year');
    expect(yearEnd.year()).toEqual(jalaliData.year());
    expect(yearEnd.month()).toEqual(jalaliData.month());
    expect(yearEnd.date()).toEqual(jalaliData.date());
  });

  it('should get year start', () => {
    const date = moment().year(2018).month(5).date(15);
    const yearEnd = dateService.getYearStart(date);
    const jalaliData = date.locale('fa').startOf('year');
    expect(yearEnd.year()).toEqual(jalaliData.year());
    expect(yearEnd.month()).toEqual(jalaliData.month());
    expect(yearEnd.date()).toEqual(jalaliData.date());
  });

  it('should get number of days in month', () => {
    const firstDate = moment().year(2018).month(1).date(10);
    const firstJalaliDate = firstDate.locale('fa');
    expect(dateService.getNumberOfDaysInMonth(firstDate)).toBe(firstJalaliDate.daysInMonth());

    const secondDate = moment().year(2018).month(0).date(10);
    const secondJalaliDate = secondDate.locale('fa');
    expect(dateService.getNumberOfDaysInMonth(secondDate)).toBe(secondJalaliDate.daysInMonth());
  });

  it('should get number of days in month in leap year', () => {
    const newDate = moment().year(2016).month(1).date(10);
    const jalaliData = newDate.locale('fa');
    expect(dateService.getNumberOfDaysInMonth(newDate)).toBe(jalaliData.daysInMonth());

  });

  it('should add day', () => {
    const newDate = dateService.addDay(moment().year(2018).month(6).date(16), 1);
    const jalaliData = newDate.locale('fa');
    expect(newDate.year()).toEqual(jalaliData.year());
    expect(newDate.month()).toEqual(jalaliData.month());
    expect(newDate.date()).toEqual(jalaliData.date());
  });

  it('should add day in the end of the year', () => {
    const newDate = dateService.addDay(moment().year(2018).month(11).date(31), 1);
    const jalaliData = newDate.locale('fa');
    expect(newDate.year()).toEqual(jalaliData.year());
    expect(newDate.month()).toEqual(jalaliData.month());
    expect(newDate.date()).toEqual(jalaliData.date());
  });

  it('should add day in the leap year', () => {
    const newDate = dateService.addDay(moment().year(2016).month(1).date(29), 1);
    const jalaliData = newDate.locale('fa');
    expect(newDate.year()).toEqual(jalaliData.year());
    expect(newDate.month()).toEqual(jalaliData.month());
    expect(newDate.date()).toEqual(jalaliData.date());
  });

  it('should add month', () => {
    const newDate = dateService.addMonth(moment().year(2018).month(6).date(16), 1);
    const jalaliData = newDate.locale('fa');
    expect(newDate.year()).toEqual(jalaliData.year());
    expect(newDate.month()).toEqual(jalaliData.month());
    expect(newDate.date()).toEqual(jalaliData.date());
  });

  it('should add month in the end of the year', () => {
    const newDate = dateService.addMonth(moment().year(2018).month(11).date(16), 1);
    const jalaliData = newDate.locale('fa');
    expect(newDate.year()).toEqual(jalaliData.year());
    expect(newDate.month()).toEqual(jalaliData.month());
    expect(newDate.date()).toEqual(jalaliData.date());
  });

  it('should add year', () => {
    const newDate = dateService.addYear(moment().year(2018).month(11).date(16), 1);
    const jalaliData = newDate.locale('fa');
    expect(newDate.year()).toEqual(jalaliData.year());
    expect(newDate.month()).toEqual(jalaliData.month());
    expect(newDate.date()).toEqual(jalaliData.date());
  });

  it('should set hour', () => {
    const newDate = dateService.setHours(moment(), 12);
    expect(newDate.hour()).toEqual(12);
  });

  it('should set minute', () => {
    const newDate = dateService.setMinutes(moment(), 30);
    expect(newDate.minute()).toEqual(30);
  });

  it('should set seconds', () => {
    const newDate = dateService.setSeconds(moment(), 30);
    expect(newDate.seconds()).toEqual(30);
  });

  it('should add hour', () => {
    const newDate = dateService.addHours(moment().hour(2), 1);
    expect(newDate.hour()).toEqual(3);
  });

  it('should add minute', () => {
    const newDate = dateService.addMinutes(moment().hour(1).minute(55), 5);
    expect(newDate.hour()).toEqual(2);
    expect(newDate.minute()).toEqual(0);
  });

  it('should create date', () => {
    const date = dateService.createDate(2018, 6, 16);
    const jalaliData = date.locale('fa');
    expect(date.year()).toEqual(jalaliData.year());
    expect(date.month()).toEqual(jalaliData.month());
    expect(date.date()).toEqual(jalaliData.date());
  });

  it('should create date for two digit year', () => {
    const date = dateService.createDate(12, 6, 16);
    expect(dateService.getYear(date)).toBe(12);
    expect(dateService.getMonth(date)).toBe(6);
    expect(dateService.getDate(date)).toBe(16);
  });

  it('should clone', () => {
    const date = moment().year(2018).month(6).date(16);
    const jalaliData = date.locale('fa');
    expect(dateService.clone(date)).toEqual(jalaliData);
  });

  it('should get month start', () => {
    const date = dateService.getMonthStart(moment().year(2018).month(6).date(16));
    const jalaliData = date.locale('fa');
    expect(date.year()).toEqual(jalaliData.year());
    expect(date.month()).toEqual(jalaliData.month());
    expect(date.date()).toEqual(jalaliData.date());
  });

  it('should compare years correctly', () => {
    expect(dateService.isSameYear(moment().year(2018).month(0), moment().year(2018).month(2))).toBeTruthy();
    expect(dateService.isSameYear(moment().year(2018).month(0), moment().year(3400).month(6))).toBeFalsy();
  });

  it('should compare months correctly', () => {
    expect(dateService.isSameMonth(moment().year(2018).month(6), moment().year(2018).month(6))).toBeTruthy();
    expect(dateService.isSameMonth(moment().year(2018).month(0), moment().year(2018).month(6))).toBeFalsy();
  });

  it('should compare days correctly', () => {
    expect(dateService.isSameMonth(moment().year(2018).month(6).date(16),
      moment().year(2018).month(6).date(16))).toBeTruthy();
    expect(dateService.isSameMonth(moment().year(2018).month(7).date(16),
      moment().year(2018).month(6).date(16))).toBeFalsy();
  });

  it('should compare dates correctly', () => {
    expect(dateService.compareDates(moment().year(2018).month(6).date(16),
      moment().year(2017).month(2).date(14))).toBeGreaterThan(0);

    expect(dateService.compareDates(moment().year(2018).month(6).date(16),
      moment().year(2019).month(2).date(14))).toBeLessThan(0);

    expect(dateService.compareDates(moment().year(2018).month(6).date(16),
      moment().year(2018).month(6).date(16))).toBe(0);
  });
});