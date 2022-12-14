import { Injectable } from '@angular/core';
import { RequestLogin } from '../dto/requestLogin';
import { Utente } from '../dto/utente';
import { Observable, Subject } from "rxjs";
import { DelegateService } from './delegate.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  removeUtente(){
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
