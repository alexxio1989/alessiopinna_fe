import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { EventInfo } from '../dto/EventInfo';
import { Corso } from '../dto/corso';
import { PrenotazioneService } from '../service/prenotazione.service';
import { Prenotazione } from '../dto/prenotazione';
import { DelegateService } from '../service/delegate.service';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent  {

  @Input() corso: Corso;
  private yesterday: Date;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    event: CalendarEvent
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent<EventInfo>[];
  eventsNotConfirmed: CalendarEvent<EventInfo>[];
  activeDayIsOpen: boolean = false;

  constructor(private modal: NgbModal , private prenotazione_service : PrenotazioneService , private ds:DelegateService) {
    this.initializeYesterday();
    //this.initializeEvents();
    this.events = []
    this.eventsNotConfirmed =[]
  }

  private initializeYesterday() {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
  }

  private initializeEvents() {
    this.events = [
      {
        title: 'Editable event',
        color: colors.yellow,
        start: this.yesterday,
        actions: [
          {
            label: '<i class="fa fa-fw fa-pencil"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              console.log('Edit event', event);
            }
          }
        ]
      },
      {
        title: 'Deletable event',
        color: colors.blue,
        start: this.yesterday,
        actions: [
          {
            label: '<i class="fa fa-fw fa-times"></i>',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.events = this.events.filter(iEvent => iEvent !== event);
              console.log('Event deleted', event);
            }
          }
        ]
      },
      {
        title: 'Non editable and deletable event',
        color: colors.red,
        start: this.yesterday
      }
    ];
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {

    let count = 0
    if(this.events.length > 0){
      count = this.events[this.events.length -1].meta.id + 1
    } else {
      count = 1
    }

    let today = new Date();
    
    this.eventsNotConfirmed = [
      ...this.eventsNotConfirmed,
      {
        title: 'New event',
        start: today,
        end: today,
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        meta:{
          id:count,
          confirmed:false,
          ore:0
        }
      }
    ];
  }

  conferma(event: CalendarEvent<EventInfo>){
    event.meta.confirmed = true
    let endDate = addHours(event.start,event.meta.ore)
    let prenotazione = new Prenotazione();
    prenotazione.corso = this.corso;
    prenotazione.dataPrenotazione = event.start;
    prenotazione.qntOre = event.meta.ore;
    this.prenotazione_service.save(prenotazione).subscribe(next => {
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      } else {
        this.events = [
          ...this.events,
          {
            title: 'Lezione online ' + this.corso.titolo,
            start: event.start,
            end: endDate,
            color: colors.red,
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true
            },
            meta:{
              id:event.meta.id,
              confirmed:event.meta.confirmed,
              ore:event.meta.ore
            }
          }
        ];
        
        this.ds.sbjErrorsNotification.next("PRENOTAZIONE AVVUNUTA CON SUCCESSO")
      }
      this.ds.sbjSpinner.next(false)
      
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante il salvataggio della prenotazione")
    })

  }

  addHours(date:Date, hours:number):Date {
    date.setHours(date.getHours() + hours);
  
    return date;
  }

  deleteEvent(eventToDelete: CalendarEvent<EventInfo>) {
    
    this.activeDayIsOpen = false

    let prenotazione = new Prenotazione();
    prenotazione.id = eventToDelete.meta.id;
    prenotazione.corso = this.corso;
    prenotazione.dataPrenotazione = eventToDelete.start;
    prenotazione.qntOre = eventToDelete.meta.ore;
    this.prenotazione_service.delete(prenotazione).subscribe(next=>{
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      } else {
        this.eventsNotConfirmed = this.eventsNotConfirmed.filter(event => event.meta.id !== eventToDelete.meta.id);
        this.events = this.events.filter(event => event.meta.id !== eventToDelete.meta.id);
        this.ds.sbjErrorsNotification.next("ELIMINAZIONE AVVUNUTA CON SUCCESSO")
      }
      this.ds.sbjSpinner.next(false)
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante l'eliminazione della prenotazione")
    })
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  get allConfirmed():boolean{
    let allConfirmed : boolean;
     this.eventsNotConfirmed
     if(this.eventsNotConfirmed.length === 0){
      allConfirmed = true
     } else {
      allConfirmed = this.eventsNotConfirmed.length === this.eventsNotConfirmed.filter(item => item.meta.confirmed).length;
     }

     return allConfirmed;
  }

}
