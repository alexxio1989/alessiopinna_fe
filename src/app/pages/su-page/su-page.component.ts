import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/dto/corso';
import { Dominio } from 'src/app/dto/dominio';
import { Utente } from 'src/app/dto/utente';
import { CorsoService } from 'src/app/service/corso.service';
import { DelegateService } from 'src/app/service/delegate.service';
import { TlpService } from 'src/app/service/tlp.service';
import { UtenteService } from 'src/app/service/utente.service';

@Component({
  selector: 'app-su-page',
  templateUrl: './su-page.component.html',
  styleUrls: ['./su-page.component.scss']
})
export class SuPageComponent implements OnInit {

  userLogged : Utente;
  isUtenteLogged = false;
  isSU = false;

  corso: Corso;

  tplCorsi: Dominio[];

  corsi: Corso[];

  maintab = 0;

  constructor(private corso_service: CorsoService , private ds:DelegateService,private route: Router,private user_service:UtenteService,private tpl_service:TlpService) { }

  ngOnInit(): void {
    this.user_service.notifyUtenteLogged.asObservable().subscribe(next=>{
      this.userLogged = next;
      this.isUtenteLogged = next !== undefined && next !== null;
      this.isSU = 'SU' ===  this.userLogged.tipo.codice
      if(!this.isSU){
        this.route.navigate(['']);
      }
    })

    this.userLogged = this.user_service.getUtente();
    this.isUtenteLogged = this.userLogged !== undefined && this.userLogged !== null;
    
    if(!this.isUtenteLogged){
      this.route.navigate(['']);
    } else {
      this.isSU = 'SU' ===  this.userLogged.tipo.codice
      if(!this.isSU){
        this.route.navigate(['']);
      }

      this.corso = new Corso()
      this.corso.imgName = 'default';
      this.corso.prezzo = 0
      this.tpl_service.getTlpCorsi().subscribe(next => {
        this.tplCorsi = next;
      })

      this.corso_service.getCorsi(false).subscribe(next=>{
        this.corsi = next.corsi;
        const corsi = localStorage.getItem('CORSI');
        if(!corsi){ 
          localStorage.setItem('CORSI' , JSON.stringify(next.corsi))
        }
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


  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  reset(){
    this.corso = new Corso();
    this.corso.imgName = 'default';
    this.corso.prezzo = 0
  }

  getTab(event:any){
    //this.login = event.index === 0 ? true : false
    console.log(event)
  }

  edit(corso:Corso){
    this.corso = corso
    this.maintab = 2
  }

  save(){
    localStorage.removeItem('CORSI');
    this.corso_service.save(this.corso).subscribe(next => {
      this.corsi = next.corsi;
      
      this.ds.sbjSpinner.next(false)
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      } else {
        this.ds.sbjErrorsNotification.next("Salvataggio avvenuto con successo")
      }
    },error =>{
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante il salvataggio")
    })
  }

  

}
