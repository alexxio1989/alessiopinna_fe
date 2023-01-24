import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseAcquisto } from '../dto/response/responseAcquisto';
import { Utente } from '../dto/utente';
import { DelegateService } from './delegate.service';
import { UtenteService } from './utente.service';
import { HttpHeaders } from '@angular/common/http';
import { Acquisto } from '../dto/acquisto';
import { Corso } from '../dto/corso';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  constructor(private http: HttpClient ,  private ds:DelegateService ,private user_service:UtenteService) { }

  save(req:Acquisto): Observable<ResponseAcquisto>{
    this.ds.sbjSpinner.next(true)
    const googleToken = this.user_service.getGoogleToken();
   
    const httpOptions = {
      headers: new HttpHeaders({
        'token-google': JSON.stringify(googleToken)
      })
    };
    return this.http.post<ResponseAcquisto>(environment.acquisto + '/save',req,httpOptions);
  }

  delete(req:Acquisto): Observable<ResponseAcquisto>{
    this.ds.sbjSpinner.next(true)
    const googleToken = this.user_service.getGoogleToken();
   
    const httpOptions = {
      headers: new HttpHeaders({
        'token-google': JSON.stringify(googleToken)
      })
    };
    return this.http.post<ResponseAcquisto>(environment.acquisto + '/delete',req,httpOptions);
  }

  getAllByUtente(utente:Utente): Observable<ResponseAcquisto>{
    this.ds.sbjSpinner.next(true)
    return this.http.get<ResponseAcquisto>(environment.acquisto + '/getAll/'+utente.id);
  }

  getAllByUtenteAndCorso(utente:Utente,corso:Corso): Observable<ResponseAcquisto>{
    this.ds.sbjSpinner.next(true)
    
    const googleToken = this.user_service.getGoogleToken();
   
    const httpOptions = {
      headers: new HttpHeaders({
        'token-google': JSON.stringify(googleToken)
      })
    };

    return this.http.get<ResponseAcquisto>(environment.acquisto + '/getAll/'+utente.id+'/'+corso.id ,httpOptions);
  }
}
