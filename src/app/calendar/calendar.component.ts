import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  OnInit,
  ChangeDetectorRef
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
import { UtenteService } from '../service/utente.service';
import { ResponsePrenotazione } from '../dto/responsePrenotazione';


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
export class CalendarComponent implements OnInit {

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

  constructor(private modal: NgbModal , 
              private prenotazione_service : PrenotazioneService , 
              private ds:DelegateService , 
              private user_service:UtenteService,
              private changeDetectorRef: ChangeDetectorRef) {
    this.initializeYesterday();
    //this.initializeEvents();
    this.events = []
    this.eventsNotConfirmed =[]
  }

  ngOnInit(): void {
    this.prenotazione_service.getAllByUtenteAndCorso(this.user_service.getUtente(),this.corso).subscribe(next =>{
      this.ds.sbjSpinner.next(false)
      next.prenotazioni.forEach(prenotazione => {
        this.events.push(this.getEvent(prenotazione,true))
        this.eventsNotConfirmed.push(this.getEvent(prenotazione,true))
        this.changeDetectorRef.detectChanges();
        this.refresh.next(this.getEvent(prenotazione,true))
      });
      
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore il recupero delle prenotazioni")
    })
  }

  private getEvent(prenotazione:Prenotazione, confirmed:boolean):CalendarEvent<EventInfo>{
    let startEvent = prenotazione.dataPrenotazione;
    let endEvent = addHours(startEvent,prenotazione.qntOre);
    return {
      title: prenotazione.corso.titolo,
      start: startEvent,
      end: endEvent,
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      meta:{
        id:prenotazione.id,
        confirmed:confirmed,
        ore:prenotazione.qntOre
      }
    };
  }

  private initializeYesterday() {
    this.yesterday = new Date();
    this.yesterday.setDate(this.yesterday.getDate() - 1);
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
    prenotazione.utente = this.user_service.getUtente()
    prenotazione.dataPrenotazione = event.start;
    prenotazione.qntOre = event.meta.ore;
    prenotazione.fromDetail = true
    this.prenotazione_service.save(prenotazione).subscribe((next:ResponsePrenotazione) => {
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      } else {
        this.events = []
        next.prenotazioni.forEach(prenotazione => {
          this.events.push(this.getEvent(prenotazione,true))
          this.refresh.next(this.getEvent(prenotazione,true))
        });
        this.changeDetectorRef.detectChanges();
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
    prenotazione.utente = this.user_service.getUtente()
    prenotazione.dataPrenotazione = eventToDelete.start;
    prenotazione.qntOre = eventToDelete.meta.ore;
    prenotazione.fromDetail = true
    this.prenotazione_service.delete(prenotazione).subscribe(next=>{
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      } else {
        this.events = []
        this.eventsNotConfirmed = []
        next.prenotazioni.forEach(prenotazione => {
          this.events.push(this.getEvent(prenotazione,true))
          this.eventsNotConfirmed.push(this.getEvent(prenotazione,true))
          this.refresh.next(this.getEvent(prenotazione,true))
        });
        this.changeDetectorRef.detectChanges();
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
