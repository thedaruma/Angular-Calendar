import { Component, OnInit, Input } from '@angular/core';
import { CalendarData } from '../../utility/CalendarData';
import { CalendarBuilder } from '../../utility/calendar-builder';
import { CalendarDataService } from '../services/calendar-data.service';
import { Subscription } from 'rxjs/Subscription';
/**
 * Canvas component is in charge of rendering the calendars. It receives data via a service from the form component, then renders out calendars based on that data.
 */
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  @Input() 
  public data:CalendarData;
  public countStarted:boolean=false;
  private subscription:Subscription;
  public month: any[];
  public calendar: any[];
  public startDate:any;
  public endDate:any;
  constructor(private calendarService:CalendarDataService) {
    this.subscription = this.calendarService.calendarUpdated$.subscribe(c=>{
      this.data = c;
      this.createCalendars();
    })
    this.calendar = [];
 

  }

  createCalendars(){
      let cb = new CalendarBuilder(this.data);
      cb.createCalendars();
      this.calendar = cb.calendar.months;
  }
  ngOnInit() {

  }

}
