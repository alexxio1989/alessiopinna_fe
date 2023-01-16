import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from 'src/environments/environment';
import { DialogLoginComponent } from '../dialog/dialog-login/dialog-login.component';
import { Corso } from '../../dto/corso';
import { Utente } from '../../dto/utente';
import { CorsoService } from '../../service/corso.service';
import { UtenteService } from '../../service/utente.service';

@Component({
  selector: 'app-card-corso',
  templateUrl: './card-corso.component.html',
  styleUrls: ['./card-corso.component.scss']
})
export class CardCorsoComponent implements OnInit {

  userLogged : Utente;
  isUtenteLogged = false;

  @Input() corso: Corso;

  constructor(private user_service:UtenteService , 
              private corso_service:CorsoService ,
              private route: Router,
              private deviceService: DeviceDetectorService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user_service.notifyUtenteLogged.asObservable().subscribe(next=>{
      console.log("utente from card : " + JSON.stringify(next))
      this.userLogged = next;
      this.isUtenteLogged = next !== undefined && next !== null;
    })

    this.userLogged = this.user_service.getUtente();
    console.log("utente from card ngOnInit: " + JSON.stringify(this.userLogged))
    this.isUtenteLogged = this.userLogged !== undefined && this.userLogged !== null;
  }

  goToDetail(){
    if(this.userLogged){
      this.corso_service.rmvCorso();
      this.corso_service.setCorso(this.corso)
      this.route.navigate(['/detail']);
    }else{
      this.openLogin()
    }
    
  }

  openLogin(){
    window.open(environment.path + "/login/google");
    window.self.close();
    
  }
 
}
