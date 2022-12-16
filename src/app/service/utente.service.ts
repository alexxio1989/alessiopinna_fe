import { Injectable } from '@angular/core';
import { RequestLogin } from '../dto/requestLogin';
import { Utente } from '../dto/utente';
import { Subject } from "rxjs";
import { DelegateService } from './delegate.service';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private utente: Utente;

  notifyUtenteLogged = new Subject<Utente>();

  constructor(private ds:DelegateService) { }

  getUtente(): Utente{
    const user = localStorage.getItem('USER');
    if(user){
      this.utente = JSON.parse(JSON.stringify(user));
    }
    return this.utente;
  }

  signin(req:RequestLogin){
    this.ds.sbjSpinner.next(true)
  }

  login(req:RequestLogin){
    this.ds.sbjSpinner.next(true)
  }
}
