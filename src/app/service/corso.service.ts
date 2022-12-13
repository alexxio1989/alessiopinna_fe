import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Corso } from '../dto/corso';
import CorsiJson from '../../assets/mock/Corsi.json';
import { HttpClient } from '@angular/common/http';
import { ResponseCorso } from '../dto/responseCorso';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CorsoService {

  constructor(private http: HttpClient) { }

  getCorsi(): Observable<any>{

    return this.http.get(environment.getCorsi);
  }
}
