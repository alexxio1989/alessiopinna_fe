import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/dto/corso';
import { EventInfo } from 'src/app/dto/EventInfo';
import { Utente } from 'src/app/dto/utente';
import { getEvent } from 'src/app/mapper/calendar-mapper';
import { CalendarService } from 'src/app/service/calendar.service';
import { CorsoService } from 'src/app/service/corso.service';
import { DelegateService } from 'src/app/service/delegate.service';
import { PrenotazioneService } from 'src/app/service/prenotazione.service';
import { UtenteService } from 'src/app/service/utente.service';



@Component({
  selector: 'app-detail-corso',
  templateUrl: './detail-corso.component.html',
  styleUrls: ['./detail-corso.component.scss']
})
export class DetailCorsoComponent implements OnInit {

  corso: Corso;

  isMobile: boolean;
  userLogged : Utente;
  isUtenteLogged = false;

  events: CalendarEvent<EventInfo>[] = [];

  constructor(private corso_service:CorsoService,
              private route: Router ,
              private deviceService: DeviceDetectorService ,
              private prenotazione_service : PrenotazioneService , 
              private ds:DelegateService ,
              private cs :CalendarService, 
              private user_service:UtenteService,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.corso = this.corso_service.getCorso(); 
    this.isMobile = this.deviceService.isMobile();
    this.user_service.notifyUtenteLogged.asObservable().subscribe(next=>{
      this.userLogged = next;
      this.isUtenteLogged = next !== undefined && next !== null;
    })
    this.userLogged = this.user_service.getUtente();
    this.isUtenteLogged = this.userLogged !== undefined && this.userLogged !== null;

    this.prenotazione_service.getAllByUtenteAndCorso(this.user_service.getUtente(),this.corso).subscribe(next =>{
      this.ds.sbjSpinner.next(false)

      let utente = this.user_service.getUtente();
      utente.prenotazioni = next.prenotazioniUtente
      
      this.user_service.removeUtente()
      this.user_service.setUtente(utente)
      next.prenotazioni.forEach(prenotazione => {
        this.events.push(getEvent(prenotazione,true))
        this.changeDetectorRef.detectChanges();
        this.cs.refreshCalendar.next()
      });
      this.cs.eventsSBJ.next(this.events);
      
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore il recupero delle prenotazioni")
    })
  }

  indietro(){
    this.route.navigate(['']);
  }

}
