import { Component, OnInit } from '@angular/core';
import { RequestLogin } from 'src/app/dto/requestLogin';
import { Utente } from 'src/app/dto/utente';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent implements OnInit {


  requestLogin:RequestLogin
  utente:Utente
  passwordConfirm = ''

  login = true

  constructor() { }

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

}
