import { Component } from '@angular/core';

import { ClockService } from "../services/clock.service";

const generateNumArr = (end = 0) => {
  const res = []
  for (let i = 0; i < end; i++) {
    res.push(i)
  }
  return res
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  date: Date;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  hrsDrift: number = 0;
  minsDrift: number = 0;

  hoursList: number[] = generateNumArr(24);
  minsList: number[] = generateNumArr(60);

  constructor(private _clockService: ClockService) {
    this._clockService.time.subscribe((now: Date) => {
      this.hour = now.getHours() - this.hrsDrift;
      this.minute = now.getMinutes() - this.minsDrift;
      this.second = now.getSeconds();
    })
  }

  custom = {
    hrs: 0,
    mins: 0,
  }

  apply() {
    const date = new Date();
    this.hrsDrift = date.getHours() - this.custom.hrs;
    this.minsDrift = date.getMinutes() - this.custom.mins;
  }

  reset() {
    const date = new Date();
    this.hrsDrift = 0;
    this.minsDrift = 0;
  }

}
