import { Injectable } from '@angular/core';
import { RequestLogin } from '../dto/requestLogin';
import { Utente } from '../dto/utente';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private utente: Utente;

  notifyUtenteLogged = new Subject<Utente>();

  constructor() { }

  getUtente(): Utente{
    const user = localStorage.getItem('USER');
    if(user){
      this.utente = JSON.parse(JSON.stringify(user));
    }
    return this.utente;
  }

  login(req:RequestLogin){

  }
}
