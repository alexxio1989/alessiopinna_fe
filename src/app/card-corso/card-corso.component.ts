import { Component, Input, OnInit } from '@angular/core';
import { Corso } from '../dto/corso';
import { Utente } from '../dto/utente';
import { UtenteService } from '../service/utente.service';

@Component({
  selector: 'app-card-corso',
  templateUrl: './card-corso.component.html',
  styleUrls: ['./card-corso.component.scss']
})
export class CardCorsoComponent implements OnInit {

  userLogged : Utente;
  isUtenteLogged = false;

  @Input() corso: Corso;

  constructor(private user_service:UtenteService) { }

  ngOnInit(): void {
    this.user_service.notifyUtenteLogged.asObservable().subscribe(next=>{
      this.userLogged = next;
      this.isUtenteLogged = next !== undefined && next !== null;
    })

    this.userLogged = this.user_service.getUtente();
    this.isUtenteLogged = this.userLogged !== undefined && this.userLogged !== null;
  }

}
