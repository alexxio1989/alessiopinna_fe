import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Router } from '@angular/router';
import { Corso } from '../../dto/corso';
import { EventInfo } from '../../dto/EventInfo';
import { Prenotazione } from '../../dto/prenotazione';
import { ResponsePrenotazione } from '../../dto/responsePrenotazione';
import { addHours, getEvent } from '../../mapper/calendar-mapper';
import { CalendarService } from '../../service/calendar.service';
import { DelegateService } from '../../service/delegate.service';
import { PrenotazioneService } from '../../service/prenotazione.service';
import { UtenteService } from '../../service/utente.service';

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
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrls: ['./prenotazioni.component.scss']
})
export class PrenotazioniComponent implements OnInit {

  @Input() dettaglio: boolean;
  @Input() corso: Corso;
  @Input() events: CalendarEvent<EventInfo>[];
  eventsNotConfirmed: CalendarEvent<EventInfo>[] = [];

  today = new Date();
  

  constructor(public ds:DelegateService , 
              public cs:CalendarService,
              private route: Router,
              private user_service:UtenteService,
              private changeDetectorRef: ChangeDetectorRef,
              private prenotazione_service : PrenotazioneService) { }

  ngOnInit(): void {
    this.today = addHours(this.today, 3);
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
        start: this.today,
        end: this.today,
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

  conferma(event: CalendarEvent<EventInfo>){
    this.deleteNotConfirmed(event)
    event.meta.confirmed = true
    let endDate = addHours(event.start,event.meta.ore)
    let prenotazione = new Prenotazione();
    prenotazione.corso = this.corso;
    prenotazione.utente = this.user_service.getUtente()
    prenotazione.dataPrenotazione = event.start;
    prenotazione.qntOre = event.meta.ore;
    prenotazione.fromDetail = true
    this.cs.refreshCalendar.next()
    this.prenotazione_service.save(prenotazione).subscribe((next:ResponsePrenotazione) => {
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
        if(999 === next.code){
          this.user_service.removeUtente()
          this.route.navigate(['']);
        }
      } else {
        this.events = []
        let utente = this.user_service.getUtente();
        utente.prenotazioni = next.prenotazioniUtente
        this.user_service.removeUtente()
        this.user_service.setUtente(utente)
        next.prenotazioni.forEach(prenotazione => {
          this.events.push(getEvent(prenotazione,true))
          
          this.cs.refreshCalendar.next()
        });
        this.cs.eventsSBJ.next(this.events);
        this.changeDetectorRef.detectChanges();
        this.ds.sbjErrorsNotification.next("PRENOTAZIONE AVVUNUTA CON SUCCESSO")
      }
      this.ds.sbjSpinner.next(false)
      
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante il salvataggio della prenotazione")
    })

  }

  delete(eventToDelete: CalendarEvent<EventInfo>) {
    
    this.cs.activeDayIsOpenSBJ.next(false);

    let prenotazione = new Prenotazione();
    prenotazione.id = eventToDelete.meta.id;
    prenotazione.corso = this.corso;
    prenotazione.utente = this.user_service.getUtente()
    prenotazione.dataPrenotazione = eventToDelete.start;
    prenotazione.qntOre = eventToDelete.meta.ore;
    prenotazione.fromDetail = true
    this.cs.refreshCalendar.next()
    this.prenotazione_service.delete(prenotazione).subscribe(next=>{
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
        if(999 === next.code){
          this.user_service.removeUtente()
          this.route.navigate(['']);
        }
      } else {
        this.events = []
        this.eventsNotConfirmed = []
        let utente = this.user_service.getUtente();
        utente.prenotazioni = next.prenotazioniUtente
        this.user_service.removeUtente()
        this.user_service.setUtente(utente)
        next.prenotazioni.forEach(prenotazione => {
          this.events.push(getEvent(prenotazione,true))
          
          this.eventsNotConfirmed.push(getEvent(prenotazione,true))
          this.cs.refreshCalendar.next()
        });
        this.cs.eventsSBJ.next(this.events);
        this.changeDetectorRef.detectChanges();
        this.ds.sbjErrorsNotification.next("ELIMINAZIONE AVVUNUTA CON SUCCESSO")
      }
      this.ds.sbjSpinner.next(false)
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante l'eliminazione della prenotazione")
    })
  }

  deleteNotConfirmed(eventToDelete: CalendarEvent<EventInfo>) {

    this.eventsNotConfirmed = this.eventsNotConfirmed.filter((element) => { element.meta.id !== eventToDelete.meta.id})
  }

}
