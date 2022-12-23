import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Corso } from '../dto/corso';
import { Prenotazione } from '../dto/prenotazione';
import { ResponsePrenotazione } from '../dto/responsePrenotazione';
import { Utente } from '../dto/utente';
import { DelegateService } from './delegate.service';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  constructor(private http: HttpClient ,  private ds:DelegateService) { }

  save(req:Prenotazione): Observable<ResponsePrenotazione>{
    this.ds.sbjSpinner.next(true)
    return this.http.post<ResponsePrenotazione>(environment.prenotazione + '/save',req);
  }

  delete(req:Prenotazione): Observable<ResponsePrenotazione>{
    this.ds.sbjSpinner.next(true)
    return this.http.post<ResponsePrenotazione>(environment.prenotazione + '/delete',req);
  }

  getAllByUtente(utente:Utente): Observable<ResponsePrenotazione>{
    this.ds.sbjSpinner.next(true)
    return this.http.get<ResponsePrenotazione>(environment.prenotazione + '/getAllByUtente/'+utente.id);
  }

  getAllByUtenteAndCorso(utente:Utente,corso:Corso): Observable<ResponsePrenotazione>{
    this.ds.sbjSpinner.next(true)
    return this.http.get<ResponsePrenotazione>(environment.prenotazione + '/getAllByUtenteAndCorso/'+utente.id+'/'+corso.id);
  }
}
