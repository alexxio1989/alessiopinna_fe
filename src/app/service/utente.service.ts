import { Injectable } from '@angular/core';
import { RequestLogin } from '../dto/requestLogin';
import { Utente } from '../dto/utente';
import { Observable, Subject } from "rxjs";
import { DelegateService } from './delegate.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Token from '../../assets/mock/token.json';
import { TokenResponse } from '../dto/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private utente: Utente;

  notifyUtenteLogged = new Subject<Utente>();

  constructor(private http: HttpClient , private ds:DelegateService) { }

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

  socialSignin(req:RequestLogin): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.utente + '/socialSignin',req); 
  }
}
