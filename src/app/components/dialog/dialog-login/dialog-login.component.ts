import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RequestLogin } from 'src/app/dto/request/requestLogin';
import { Utente } from 'src/app/dto/utente';
import { DelegateService } from 'src/app/service/delegate.service';
import { UtenteService } from 'src/app/service/utente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent implements OnInit {

  auth2: any;
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  requestLogin:RequestLogin
  utente:Utente
  passwordConfirm = ''

  maintab = 0;

  login = true
  loginForm!: FormGroup;
  isLoggedin?: boolean;

  loggedIn: boolean;

  constructor(private user_service:UtenteService,
              private ds:DelegateService , 
              private dialogRef: MatDialogRef<DialogLoginComponent>,
              private formBuilder: FormBuilder) { 
                
              }

  getValidPassword():boolean{
    return this.requestLogin.password !== undefined &&
    this.requestLogin.password !== null &&
     '' !== this.requestLogin.password
  }

  get enableLogin():boolean {
    return this.requestLogin.password !== undefined &&
     this.requestLogin.password !== null &&
      '' !== this.requestLogin.password &&
       this.utente.email !== undefined &&
       this.utente.email !== null
  }

  get enableSignin():boolean {
    return this.requestLogin.password !== undefined &&
     this.requestLogin.password !== null &&
      '' !== this.requestLogin.password &&
       this.utente.email !== undefined &&
       this.utente.email !== null && 
       '' !== this.utente.email && 
       this.utente.skypeID !== undefined &&
       this.utente.skypeID !== null && 
       '' !== this.utente.skypeID && 
       this.requestLogin.password === this.passwordConfirm
  }

  ngOnInit(): void {
    this.login = true
    this.requestLogin = new RequestLogin();
    this.utente = new Utente();
  
  }



  getTab(event:any){
    this.login = event.index === 0 ? true : false
    console.log(event)
  }

  loginUser(){
    this.requestLogin.utente = this.utente;
    this.user_service.login(this.requestLogin).subscribe(next => {
      this.ds.sbjSpinner.next(false)
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      } else {
        this.ds.sbjErrorsNotification.next("Login avvenuta con successo")
        this.user_service.setUtente(next.utente)
        this.dialogRef.close();
      }
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante la login")
    })
  }

  signinUser(){
    this.requestLogin.utente = this.utente;
    this.user_service.signin(this.requestLogin).subscribe(next => {
      this.ds.sbjSpinner.next(false)
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      } else {
        this.maintab = 0
        this.ds.sbjErrorsNotification.next("Registrazione avvenuta con successo")
      }
    }, error => {
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante la signin")
    })
  }


}
