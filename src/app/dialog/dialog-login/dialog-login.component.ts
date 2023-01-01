import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RequestLogin } from 'src/app/dto/requestLogin';
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

    this.googleSDK();
  
  }

  prepareLoginButton() {
 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser:any) => {
 
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
        //this.router.navigateByUrl('/google.com');
 
      }, (error:any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
 
  }
  googleSDK() {
 
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '870651648800-pq8mbb5285trh0hfdlbfub2u24unkt8f.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
 
    (function(d:any, s:any, id:any){

      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
 
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
