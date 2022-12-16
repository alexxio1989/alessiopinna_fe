import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DelegateService {

  sbjSpinner = new Subject<boolean>();
  sbjErrorsNotification = new Subject<string>();

  constructor() { }
}
