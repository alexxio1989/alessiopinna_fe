import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DelegateService } from './delegate.service';

@Injectable({
  providedIn: 'root'
})
export class TlpService {

  constructor(private http: HttpClient ,  private ds:DelegateService) { }

  getTlpCorsi(): Observable<any>{
    return this.http.get(environment.tpl + '/all/prodotti');
  }

}
