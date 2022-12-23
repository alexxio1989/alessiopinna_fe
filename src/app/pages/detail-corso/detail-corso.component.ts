import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/dto/corso';
import { Utente } from 'src/app/dto/utente';
import { CorsoService } from 'src/app/service/corso.service';
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

  constructor(private corso_service:CorsoService,private route: Router ,private deviceService: DeviceDetectorService , private user_service:UtenteService) { }

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
  }

  indietro(){
    this.route.navigate(['']);
  }

}
