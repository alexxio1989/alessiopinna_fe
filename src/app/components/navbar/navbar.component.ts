import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UtenteService } from '../../service/utente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  constructor(private route: Router,
              public user_service:UtenteService , 
              public dialog: MatDialog) { }

  ngOnInit(): void {}


  openLogin(){
    window.open(environment.path + "/login/google");
    window.self.close();
  }

  logout(){
    this.user_service.removeUtente();
    this.route.navigate(['']);
  }

  goTo(path:string){
    if('' !== path){
      this.route.navigate(['/' + path]);
    } else {
      this.route.navigate(['']);
    }
  }

}
