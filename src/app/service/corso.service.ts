import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Corso } from '../dto/corso';
import CorsiJson from '../../assets/mock/Corsi.json';
import { HttpClient } from '@angular/common/http';
import { ResponseCorso } from '../dto/responseCorso';
import { environment } from 'src/environments/environment';
import { DelegateService } from './delegate.service';


@Injectable({
  providedIn: 'root'
})
export class CorsoService {

  private corso: Corso;

  constructor(private http: HttpClient ,  private ds:DelegateService) { }

  getCorsi(): Observable<any>{
    this.ds.sbjSpinner.next(true)
    if(environment.mock){
      const corsi = CorsiJson
      return new Observable(obs => {
        obs.next(corsi)
      })
    } else {
      return this.http.get(environment.getCorsi);
    }
  }

  setCorso(corso: Corso){
    localStorage.setItem('CORSO',JSON.stringify(corso));
  }

  rmvCorso(){
    localStorage.removeItem('CORSO');
  }

  getCorso(): Corso{
    const corso = localStorage.getItem('CORSO');
    if(corso){ 
      this.corso = JSON.parse(corso);
    }
    return this.corso;
    
  }
}
