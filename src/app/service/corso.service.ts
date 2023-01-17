import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Corso } from '../dto/corso';
import CorsiJson from '../../assets/mock/Corsi.json';
import { HttpClient } from '@angular/common/http';
import { ResponseCorso } from '../dto/response/responseCorso';
import { environment } from 'src/environments/environment';
import { DelegateService } from './delegate.service';


@Injectable({
  providedIn: 'root'
})
export class CorsoService {

  private corso: Corso;
  private corsi : Corso[];
  public mapCorsi = new Map<string, Corso[]>();

  constructor(private http: HttpClient ,  private ds:DelegateService) { }

  getCorsi(full: boolean): Observable<ResponseCorso>{
    this.ds.sbjSpinner.next(true)
    const corsi = localStorage.getItem('CORSI');
    if(corsi){ 
      this.corsi = JSON.parse(corsi);
      let response = new ResponseCorso();
      response.corsi = this.corsi;
      response.success = true
      return new Observable(obs => {
        obs.next(response)
      })
    } else {
      let basePath = environment.corso
      let fullPAth = full ? '1' : '0'
      let url = basePath + '/all/' + fullPAth;
      return this.http.get<ResponseCorso>(url);
    }
  }

  setMapCorsi(corsi :Corso[]){
    this.mapCorsi = new Map<string, Corso[]>();
    if(corsi){
      this.setCorsi(corsi)
      corsi.forEach(corso => {
        const listFiltred = this.mapCorsi.get(corso.tipo.descrizione);
        if (listFiltred) {
          listFiltred.push(corso);
        } else {
          let newListFiltred = [];
          newListFiltred.push(corso);
          this.mapCorsi.set(corso.tipo.descrizione, newListFiltred);
        }
      });
    }
  }

  setCorsi(corsi :Corso[]){
    if(!localStorage.getItem('CORSI')){
      localStorage.setItem('CORSI',JSON.stringify(corsi));
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

  save(corso:Corso): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.post(environment.corso + '/save' , corso);
  }

  delete(corso:Corso): Observable<any>{
    this.ds.sbjSpinner.next(true)
    return this.http.delete(environment.corso + '/delete/'+ corso.id);
  }
}
