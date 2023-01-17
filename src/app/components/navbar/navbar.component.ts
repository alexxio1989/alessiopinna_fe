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

  mapCorsi = new Map<Corso, CalendarEvent<EventInfo>[]>();

  prenotazioniArePresents : boolean

  constructor(private route: Router,
              private navService: SidebarService,
              public user_service:UtenteService , 
              public dialog: MatDialog) { }

  ngOnInit(): void {}

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
