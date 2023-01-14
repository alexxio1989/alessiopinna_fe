import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/dto/corso';
import { RequestLogin } from 'src/app/dto/requestLogin';
import { Utente } from 'src/app/dto/utente';
import { CorsoService } from 'src/app/service/corso.service';
import { DelegateService } from 'src/app/service/delegate.service';
import { UtenteService } from 'src/app/service/utente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  corsi: Corso[];

  isMobile = false

  mapCorsi = new Map<string, Corso[]>();

  slideConfig = {
  };

  utente:Utente;
  requestLogin:RequestLogin;
  

  constructor(private corso_service: CorsoService , 
              private deviceService: DeviceDetectorService , 
              private ds:DelegateService ,
              private route: ActivatedRoute,
              private user_service:UtenteService) { }

  ngOnInit(): void {
    this.corso_service.rmvCorso();
    this.isMobile = this.deviceService.isMobile();
    this.slideConfig = {
      "slidesToShow": 3,
      "slidesToScroll": 1,
      "dots": true,
      "infinite": false,
      "centerMode": true,
      "variableWidth": true,
      "responsive": [
        {
          "breakpoint": 1024,
          "settings": {
            "slidesToShow": 3,
            "slidesToScroll": 3,
            "centerMode": true,
            "variableWidth": true,
            "infinite": true,
            "dots": true
          }
        },
        {
          "breakpoint": 600,
          "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 2,
            "centerMode": true,
            "variableWidth": true
          }
        },
        {
          "breakpoint": 480,
          "settings": {
            "slidesToShow": 1,
            "slidesToScroll": 1,
            "centerMode": true,
            "variableWidth": true
          }
        }
      ]
    
    };
    this.route.queryParams
      .subscribe(params => {
        if(params.email && params.id){
          console.log(params); // { orderby: "price" }
          let utente = new Utente();
          this.requestLogin = new RequestLogin();
          utente.email = params.email
          this.requestLogin.utente = utente
          this.requestLogin.password = params.id
          this.user_service.socialSignin(this.requestLogin).subscribe(next => {
            this.ds.sbjSpinner.next(false)
            if(!next.success){
              this.ds.sbjErrorsNotification.next(next.error)
            } else {
              this.ds.sbjErrorsNotification.next("Login avvenuta con successo")
              this.user_service.setUtente(next.utente)
            }
          }, error => {
            this.ds.sbjSpinner.next(false)
            this.ds.sbjErrorsNotification.next("Errore durante la login")
          })
        }
      }
    );
    this.corso_service.getCorsi(false).subscribe(next=>{
      this.corsi = next.corsi;
      const corsi = localStorage.getItem('CORSI');
      if(!corsi){ 
        localStorage.setItem('CORSI' , JSON.stringify(next.corsi))
      }
      this.corsi .forEach(corso => {
        const listFiltred = this.mapCorsi.get(corso.tipo.descrizione);
        if(listFiltred){
          listFiltred.push(corso)
        } else {
          let newListFiltred = [];
          newListFiltred.push(corso)
          this.mapCorsi.set(corso.tipo.descrizione,newListFiltred);
        }
      });
      this.ds.sbjSpinner.next(false)
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      }
    },error =>{
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante il recupero delle lezioni")
    })
  }


}
