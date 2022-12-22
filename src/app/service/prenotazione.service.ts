import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Prenotazione } from '../dto/prenotazione';
import { DelegateService } from './delegate.service';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioneService {

  constructor(private http: HttpClient ,  private ds:DelegateService) { }

  save(req:Prenotazione): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.prenotazione + '/save',req);
  }

  delete(req:Prenotazione): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.prenotazione + '/delete',req);
  }
}
