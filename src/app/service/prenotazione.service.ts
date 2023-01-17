import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Corso } from '../dto/corso';
import { Prenotazione } from '../dto/prenotazione';
import { ResponsePrenotazione } from '../dto/response/responsePrenotazione';
import { Utente } from '../dto/utente';
import { DelegateService } from './delegate.service';
import { UtenteService } from './utente.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  constructor(private http: HttpClient ,  private ds:DelegateService ,private user_service:UtenteService) { }

  save(req:Prenotazione): Observable<ResponsePrenotazione>{
    this.ds.sbjSpinner.next(true)
    const googleToken = this.user_service.getGoogleToken();
   
    const httpOptions = {
      headers: new HttpHeaders({
        'token-google': JSON.stringify(googleToken)
      })
    };
    return this.http.post<ResponsePrenotazione>(environment.prenotazione + '/save',req,httpOptions);
  }

  delete(req:Prenotazione): Observable<ResponsePrenotazione>{
    this.ds.sbjSpinner.next(true)
    const googleToken = this.user_service.getGoogleToken();
   
    const httpOptions = {
      headers: new HttpHeaders({
        'token-google': JSON.stringify(googleToken)
      })
    };
    return this.http.post<ResponsePrenotazione>(environment.prenotazione + '/delete',req,httpOptions);
  }

  getAllByUtente(utente:Utente): Observable<ResponsePrenotazione>{
    this.ds.sbjSpinner.next(true)
    return this.http.get<ResponsePrenotazione>(environment.prenotazione + '/getAllByUtente/'+utente.id);
  }

  getAllByUtenteAndCorso(utente:Utente,corso:Corso): Observable<ResponsePrenotazione>{
    this.ds.sbjSpinner.next(true)
    
    const googleToken = this.user_service.getGoogleToken();
   
    const httpOptions = {
      headers: new HttpHeaders({
        'token-google': JSON.stringify(googleToken)
      })
    };

    return this.http.get<ResponsePrenotazione>(environment.prenotazione + '/getAllByUtenteAndCorso/'+utente.id+'/'+corso.id ,httpOptions);
  }
}
