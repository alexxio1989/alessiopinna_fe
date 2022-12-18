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

  getUtente(): Utente{
    const user = localStorage.getItem('USER');
    if(user){
      this.utente = JSON.parse(JSON.stringify(user));
    }
    return this.utente;
  }

  signin(req:RequestLogin): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.signin,req);
  }

  login(req:RequestLogin){
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.login,req); 
  }
}
