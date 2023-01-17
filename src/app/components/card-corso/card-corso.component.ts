import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Corso } from '../../dto/corso';
import { CorsoService } from '../../service/corso.service';
import { UtenteService } from '../../service/utente.service';

@Component({
  selector: 'app-card-corso',
  templateUrl: './card-corso.component.html',
  styleUrls: ['./card-corso.component.scss']
})
export class CardCorsoComponent implements OnInit {


  @Input() corso: Corso;

  constructor(private user_service:UtenteService , 
              private corso_service:CorsoService ,
              private route: Router,public dialog: MatDialog) { }

  ngOnInit(): void {}

  goToDetail(){
    if(this.user_service.getUtente()){
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
