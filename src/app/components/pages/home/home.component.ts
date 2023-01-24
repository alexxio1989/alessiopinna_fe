import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/dto/corso';
import { RequestLogin } from 'src/app/dto/request/requestLogin';
import { Utente } from 'src/app/dto/utente';
import { mapLoginUtente } from 'src/app/mapper/utente-mapper';
import { CorsoService } from 'src/app/service/corso.service';
import { DelegateService } from 'src/app/service/delegate.service';
import { UtenteService } from 'src/app/service/utente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isMobile = false
  

  constructor(public corso_service: CorsoService , 
              private deviceService: DeviceDetectorService , 
              private ds:DelegateService ,
              private route: ActivatedRoute,
              private user_service:UtenteService) { }

  ngOnInit(): void {
    this.corso_service.rmvCorso();
    this.isMobile = this.deviceService.isMobile();
    this.loginFromParams();
    this.getCorsi();
  }



  private loginFromParams() {
    this.route.queryParams.subscribe(params => {
      if (params.email && params.id) {
        let requestLogin = mapLoginUtente(params.email, params.id);
        this.user_service.login(requestLogin).subscribe(next => {
          this.ds.sbjSpinner.next(false);
          if (!next.success) {
            this.ds.sbjErrorsNotification.next(next.error);
          } else {
            this.ds.sbjErrorsNotification.next("Login avvenuta con successo");
            this.user_service.setUtente(next.utente);
          }
        }, error => {
          this.ds.sbjSpinner.next(false);
          this.ds.sbjErrorsNotification.next("Errore durante la login");
        });
      }
    });
  }

  private getCorsi() {
    this.corso_service.getCorsi(false).subscribe(next => {

      this.ds.sbjSpinner.next(false);
      if (!next.success) {
        this.ds.sbjErrorsNotification.next(next.error);
      } else {
        this.corso_service.setMapCorsi(next.corsi);
      }
      
    }, error => {
      this.ds.sbjSpinner.next(false);
      this.ds.sbjErrorsNotification.next("Errore durante il recupero delle lezioni");
    });
  }
}
