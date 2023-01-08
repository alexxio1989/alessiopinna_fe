import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
import { EventInfo } from '../dto/EventInfo';

@Injectable({
  providedIn: 'root'
})
export class CalendarService { 


  refreshCalendar: Subject<any> = new Subject();
  eventsSBJ:Subject<CalendarEvent<EventInfo>[]> = new Subject();
  activeDayIsOpenSBJ:Subject<boolean> = new Subject();

  constructor() { }
}
