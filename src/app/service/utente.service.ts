import { Injectable } from '@angular/core';
import { RequestLogin } from '../dto/request/requestLogin';
import { Utente } from '../dto/utente';
import { Observable, Subject } from "rxjs";
import { DelegateService } from './delegate.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Token from '../../assets/mock/token.json';
import { TokenResponse } from '../dto/tokenResponse';
import { Corso } from '../dto/corso';
import { CalendarEvent } from 'angular-calendar';
import { EventInfo } from '../dto/EventInfo';
import { getEvent } from '../mapper/calendar-mapper';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  public utente: Utente;
  public isUtenteLogged = false;
  public isSU = false;

  notifyUtenteLogged = new Subject<Utente>();
  prenotazioniArePresents : boolean
  public mapPrenotazioniUtente = new Map<Corso, CalendarEvent<EventInfo>[]>();

  constructor(private http: HttpClient , private ds:DelegateService) {
    this.notifyUtenteLogged.asObservable().subscribe(next=>{
      if(next){
        this.utente = next;
        this.isUtenteLogged = next !== undefined && next !== null;
        localStorage.removeItem('USER');
        localStorage.setItem('USER',JSON.stringify(next))
        this.isSU = 'SU' ===  this.utente.tipo.codice
        this.prenotazioniArePresents = next.acquisti && next.acquisti.length > 0

        if(next.acquisti && next.acquisti.length > 0){
          next.acquisti .forEach(acquisto => {
            const listFiltred = this.mapPrenotazioniUtente.get(acquisto.prodotto);
            if(listFiltred){
              listFiltred.push(getEvent(acquisto, true))
            } else {
              let newListFiltred = [];
              newListFiltred.push(getEvent(acquisto, true))
              this.mapPrenotazioniUtente.set(acquisto.prodotto,newListFiltred);
            }
          });
        }

      } else {
        this.isUtenteLogged = false;
        this.utente = undefined
        localStorage.removeItem('USER');
        this.mapPrenotazioniUtente = new Map<Corso, CalendarEvent<EventInfo>[]>();
      }
    })

    this.getUtente()
    this.isUtenteLogged = this.utente !== undefined && this.utente !== null;
  }

  setUtente(utente: Utente){
    localStorage.setItem('USER',JSON.stringify(utente))
    this.notifyUtenteLogged.next(utente)
  }


  getUtente(): Utente{
    const user = localStorage.getItem('USER');
    if(user){ 
      this.utente = JSON.parse(user);
    }
    return this.utente;
  }

  getGoogleToken(): TokenResponse{
    if(this.getUtente() && this.getUtente().tokens && this.getUtente().tokens.length > 0){
      let filtred =  this.getUtente().tokens.filter(item => 'GOOGLE' === item.provider);
      if(filtred && filtred.length > 0){
        return filtred[0];
      }
    }
    return null;
  }

  removeUtente(){
    this.utente = undefined
    localStorage.removeItem('USER');
    this.notifyUtenteLogged.next(undefined)
  }

  signin(req:RequestLogin): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.utente + '/signin',req);
  }

  login(req:RequestLogin): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.utente + '/login',req); 
  }

}
