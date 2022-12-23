import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from 'src/app/dto/utente';
import { UtenteService } from 'src/app/service/utente.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  userLogged : Utente;
  isUtenteLogged = false;
  isSU = false;

  constructor(private route: Router,private user_service:UtenteService) { }

  ngOnInit(): void {
    this.user_service.notifyUtenteLogged.asObservable().subscribe(next=>{
      this.userLogged = next;
      this.isUtenteLogged = next !== undefined && next !== null;
    })

    this.userLogged = this.user_service.getUtente();
    this.isUtenteLogged = this.userLogged !== undefined && this.userLogged !== null;
    
    if(!this.isUtenteLogged){
      this.route.navigate(['']);
    } else {
      this.isSU = 'SU' ===  this.userLogged.tipo.codice
    }
  }

}
