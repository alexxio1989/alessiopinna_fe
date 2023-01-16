import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from 'src/environments/environment';
import { DialogLoginComponent } from '../dialog/dialog-login/dialog-login.component';
import { Corso } from '../../dto/corso';
import { EventInfo } from '../../dto/EventInfo';
import { Utente } from '../../dto/utente';
import { getEvent } from '../../mapper/calendar-mapper';
import { SidebarService } from '../../service/sidebar.service';
import { UtenteService } from '../../service/utente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  openSide = false;

  userLogged : Utente;
  isUtenteLogged = false;
  isSU = false;
  mapCorsi = new Map<Corso, CalendarEvent<EventInfo>[]>();

  prenotazioniArePresents : boolean

  constructor(private route: Router,
              private navService: SidebarService,
              private user_service:UtenteService , 
              public dialog: MatDialog , 
              private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.user_service.notifyUtenteLogged.asObservable().subscribe(next=>{
      this.userLogged = next;
      this.isUtenteLogged = next !== undefined && next !== null;
      if(this.isUtenteLogged){
        this.prenotazioniArePresents = this.userLogged.prenotazioni && this.userLogged.prenotazioni.length > 0
        this.isSU = 'SU' ===  this.userLogged.tipo.codice

        this.mapCorsi = new Map<Corso, CalendarEvent<EventInfo>[]>();

        if(this.userLogged.prenotazioni && this.userLogged.prenotazioni.length > 0){
          this.userLogged.prenotazioni .forEach(prenotazione => {
            const listFiltred = this.mapCorsi.get(prenotazione.corso);
            if(listFiltred){
              listFiltred.push(getEvent(prenotazione, true))
            } else {
              let newListFiltred = [];
              newListFiltred.push(getEvent(prenotazione, true))
              this.mapCorsi.set(prenotazione.corso,newListFiltred);
            }
          });
        }
        
      }  
    })

    this.userLogged = this.user_service.getUtente();
    this.isUtenteLogged = this.userLogged !== undefined && this.userLogged !== null;
    if(this.isUtenteLogged){
      this.prenotazioniArePresents = this.userLogged.prenotazioni && this.userLogged.prenotazioni.length > 0
      this.isSU = 'SU' ===  this.userLogged.tipo.codice
    } 

    if(this.userLogged.prenotazioni && this.userLogged.prenotazioni.length > 0){
      this.userLogged.prenotazioni .forEach(prenotazione => {
        const listFiltred = this.mapCorsi.get(prenotazione.corso);
        if(listFiltred){
          listFiltred.push(getEvent(prenotazione, true))
        } else {
          let newListFiltred = [];
          newListFiltred.push(getEvent(prenotazione, true))
          this.mapCorsi.set(prenotazione.corso,newListFiltred);
        }
      });
    }
  }

  openSideBar(){
    this.openSide = !this.openSide;
    this.navService.sbjOpenSide.next(this.openSide)
  }

  openLogin(){
    window.open(environment.path + "/login/google");
    window.self.close();
    
  }

  logout(){
    this.user_service.removeUtente();
    this.route.navigate(['']);
  }

  goTo(path:string){
    if('' !== path){
      this.route.navigate(['/' + path]);
    } else {
      this.route.navigate(['']);
    }
  }



}
