import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { DelegateService } from './service/delegate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  openSide = false;

  constructor(private spinner: NgxSpinnerService , 
              private ds:DelegateService , 
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ds.sbjErrorsNotification.asObservable().subscribe(next => {
      this._snackBar.open(next,'',
        { 
          duration: 2000
      });
    })
    this.ds.sbjSpinner.asObservable().subscribe(next => {
      if(next){
        this.spinner.show()
      } else {
        this.spinner.hide()
      }
    })
 
  }
}
