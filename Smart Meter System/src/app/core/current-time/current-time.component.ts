import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-time',
  templateUrl: './current-time.component.html',
  styleUrls: ['./current-time.component.scss']
})
export class CurrentTimeComponent implements OnInit {
  public current_time:string;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.displayCurrentDateAndTime();
    }, 1000);

  }

  displayCurrentDateAndTime() {
    let date: Date = new Date();
    let timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    let timeString: string = date.toLocaleTimeString('en-US', timeOptions);
    let dateString: string = date.toLocaleDateString('en-US');
    let dateTime: string = dateString + ' ' + timeString;

    this.current_time = dateTime;
  }

}
