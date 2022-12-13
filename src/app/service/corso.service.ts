import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Corso } from '../dto/corso';
import CorsiJson from '../../assets/mock/Corsi.json';


@Injectable({
  providedIn: 'root'
})
export class CorsoService {

  constructor() { }

  getCorsi(): Observable<Corso[]>{

    const corsiMock = CorsiJson;
    return new Observable(obs => {
      obs.next(corsiMock)
    })
  }
}
