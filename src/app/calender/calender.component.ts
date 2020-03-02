import { Component, OnInit } from '@angular/core';
import { DataModel } from './datamodel';
import { DateDataModel } from './dateDataModel';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
})
export class CalenderComponent implements OnInit {
  months: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  lastDayAdded = false;
  secondLastDayAdded = false;
  highestDatePresent = 31;
  highlightMonth = false;
  showScheduleData = false;
  displayMonthRow1 = ['', '', '', '', '', '', ''];
  displayMonthRow2 = ['', '', '', '', '', '', ''];
  displayMonthRow3 = ['', '', '', '', '', '', ''];

  currentYearValue: number = new Date().getFullYear();
  currentMonthValue: number = new Date().getMonth();
  currentDateValue: number = new Date().getDate();
  currentMonthValueString: string;

  lastDayValue = '31';
  secondLastDayValue = '30';

  showTextBox = false;
  scheduleText: string;
  data: DataModel[] = [];
  dateData: Array<DateDataModel[]> = [];


  constructor() { }

  ngOnInit() {
    this.InitializeDateData();
    this.populateMonths();
    console.log(this.dateData);
    console.log('Current Month' + this.currentMonthValue);
    this.currentMonthValueString = this.getMonthValue(this.currentMonthValue + 1);
    console.log(this.currentMonthValueString);
    this.displayDate(this.currentMonthValueString);
  }

  InitializeDateData() {
    this.dateData = [
      [{ DateString: '1', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '8', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '15', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '22', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '29', DateData: null, DateHasData: false, ShowSchedule: false }],
      [{ DateString: '2', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '9', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '16', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '23', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '30', DateData: null, DateHasData: false, ShowSchedule: false }],
      [{ DateString: '3', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '10', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '17', DateData: null, DateHasData: false, ShowSchedule: false }, {
        DateString: '24',
        DateData: ['Meeting, 8:00', 'Call, 9:00', 'Lunch With Client, 1:00 PM'], DateHasData: true,
        ShowSchedule: false
      },
      { DateString: '31', DateData: null, DateHasData: false, ShowSchedule: false }],
      [{ DateString: '4', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '11', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '18', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '25', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '', DateData: null, DateHasData: false, ShowSchedule: false }],
      [{ DateString: '5', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '12', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '19', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '26', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '', DateData: null, DateHasData: false, ShowSchedule: false }],
      [{ DateString: '6', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '13', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '20', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '27', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '', DateData: null, DateHasData: false, ShowSchedule: false }],
      [{ DateString: '7', DateData: null, DateHasData: false, ShowSchedule: false },
      {
        DateString: '14',
        DateData: ['Meeting, 8:00', 'Call, 9:00', 'Lunch With Client, 1:00 PM'], DateHasData: true, ShowSchedule: false
      },
      { DateString: '21', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '28', DateData: null, DateHasData: false, ShowSchedule: false },
      { DateString: '', DateData: null, DateHasData: false, ShowSchedule: false }]];
  }

  addSchedule(data) {
    this.showTextBox = true;
    data.ShowAddScheduleTextBox = true;
    console.log(this.scheduleText);
    data.DateData.push(this.scheduleText);
    this.scheduleText = '';
  }

  DeleteSchedule(data, schedule) {
    const index: number = data.DateData.indexOf(schedule);
    if (index !== -1) {
      data.DateData.splice(index, 1);
    }
  }

  displayDate(data) {
    console.log(this.highestDatePresent);
    if (data === 'APR' || data === 'JUN' || data === 'SEP' || data === 'NOV') {
      this.lastDayValue = '30';
      this.secondLastDayValue = '29';

      this.dateData.forEach(x => {
        x.forEach(y => {
          if (+y.DateString > 30) {
            y.DateString = '';
            this.lastDayAdded = false;
          }
        });
      });

      // to add the missing dates again
      this.dateData.forEach(x => {
        x.forEach(y => {
          if (y.DateString === '' && this.highestDatePresent < 30) {
            this.highestDatePresent++;
            y.DateString = this.highestDatePresent.toString();
            this.lastDayAdded = false;
          }
        });
      });
      this.highestDatePresent = 30;

    } else if (data === 'FEB' && (this.currentYearValue % 4 === 0)) {
      this.lastDayValue = '29';
      this.secondLastDayValue = '28';
      this.dateData.forEach(x => {
        x.forEach(y => {
          if (+y.DateString > 29) {
            y.DateString = '';
            this.lastDayAdded = false;
            this.secondLastDayAdded = false;
          }
        });
      });
      this.highestDatePresent = 29;
    } else if (data === 'FEB' && (this.currentYearValue % 4 > 0)) {
      this.lastDayValue = '28';
      this.secondLastDayValue = '27';
      this.dateData.forEach(x => {
        x.forEach(y => {
          if (+y.DateString > 28) {
            y.DateString = '';
            this.lastDayAdded = false;
            this.secondLastDayAdded = false;
          }
        });
      });
      // to add the missing dates again
      this.dateData.forEach(x => {
        x.forEach(y => {
          if (y.DateString === '' && this.highestDatePresent < 28) {
            this.highestDatePresent++;
            y.DateString = this.highestDatePresent.toString();
            this.lastDayAdded = false;
          }
        });
      });
      this.highestDatePresent = 28;
    } else {
      console.log(this.highestDatePresent);
      this.lastDayValue = '31';
      this.secondLastDayValue = '30';

      // to add the missing dates again
      this.dateData.forEach(x => {
        x.forEach(y => {
          if (y.DateString === '' && this.highestDatePresent < 31) {
            this.highestDatePresent++;
            y.DateString = this.highestDatePresent.toString();
            this.lastDayAdded = false;
          }
        });
      });
    }
  }

  ClosePopup(selectedDateData) {
    console.log('Closing Popup');
    selectedDateData.ShowSchedule = false;
  }

  showSchedule(selectedDateData) {
    selectedDateData.ShowSchedule = true;
  }

  changeYearMinus() {
    this.currentYearValue--;
    this.data = [];
    this.displayMonthRow1 = ['', '', '', '', '', '', ''];
    this.displayMonthRow2 = ['', '', '', '', '', '', ''];
    this.displayMonthRow3 = ['', '', '', '', '', '', ''];
    this.populateMonths();
  }

  changeYearPlus() {
    this.currentYearValue++;
    this.data = [];
    this.displayMonthRow1 = ['', '', '', '', '', '', ''];
    this.displayMonthRow2 = ['', '', '', '', '', '', ''];
    this.displayMonthRow3 = ['', '', '', '', '', '', ''];
    this.populateMonths();
  }

  populateMonths() {
    const year = this.currentYearValue;
    console.log(year);
    this.months.forEach(x => {
      const dateValue = new Date(x + '/1/' + year);
      const day = dateValue.getDay();
      const weekDay = this.getDayValue(day);
      console.log(weekDay);
      const monthValue = this.getMonthValue(x);
      this.data.push({ Month: x, MonthString: monthValue, DayString: weekDay, Day: day });
    });
    console.log(this.data);
    this.generateMonthDisplayData(this.data);
  }

  generateMonthDisplayData(data) {
    data.forEach(x => {
      if (x.Day === 0) {
        x.Day = 7;
      }
      if (this.displayMonthRow1[x.Day - 1] === '') {
        this.displayMonthRow1[x.Day - 1] = x.MonthString;
      } else if (this.displayMonthRow2[x.Day - 1] === '') {
        this.displayMonthRow2[x.Day - 1] = x.MonthString;
      } else if (this.displayMonthRow3[x.Day - 1] === '') {
        this.displayMonthRow3[x.Day - 1] = x.MonthString;
      }
    });
    console.log(this.displayMonthRow1);
    console.log(this.displayMonthRow2);
    console.log(this.displayMonthRow3);
  }

  getDayValue(day: number) {
    switch (day) {
      case 1:
        return 'MON';
      case 2:
        return 'TUE';
      case 3:
        return 'WED';
      case 4:
        return 'THU';
      case 5:
        return 'FRI';
      case 6:
        return 'SAT';
      case 7:
        return 'SUN';
      case 0:
        return 'SUN';
    }
  }

  getMonthValue(day: number) {
    switch (day) {
      case 1:
        return 'JAN';
      case 2:
        return 'FEB';
      case 3:
        return 'MAR';
      case 4:
        return 'APR';
      case 5:
        return 'MAY';
      case 6:
        return 'JUN';
      case 7:
        return 'JUL';
      case 8:
        return 'AUG';
      case 9:
        return 'SEP';
      case 10:
        return 'OCT';
      case 11:
        return 'NOV';
      case 12:
        return 'DEC';
    }
  }

}
