import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DialogLoginComponent } from '../dialog/dialog-login/dialog-login.component';
import { Utente } from '../dto/utente';
import { SidebarService } from '../service/sidebar.service';
import { UtenteService } from '../service/utente.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  openSide = false;

  userLogged : Utente;
  isUtenteLogged = false;
  isSU = false;

  constructor(private route: Router,
              private navService: SidebarService,
              private user_service:UtenteService , 
              public dialog: MatDialog , 
              private deviceService: DeviceDetectorService,
              private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.user_service.notifyUtenteLogged.asObservable().subscribe(next=>{
      this.userLogged = next;
      this.isUtenteLogged = next !== undefined && next !== null;
    })

    this.userLogged = this.user_service.getUtente();
    this.isUtenteLogged = this.userLogged !== undefined && this.userLogged !== null;
    if(this.isUtenteLogged){
      this.isSU = 'SU' ===  this.userLogged.tipo.codice
    } 
  }

  openSideBar(){
    this.openSide = !this.openSide;
    this.navService.sbjOpenSide.next(this.openSide)
  }

  openLogin(){
    this.openSide = false;
    if(this.deviceService.isMobile()){
      this.dialog.open(DialogLoginComponent, {
        height: 'auto',
        width: '95%',
        maxWidth:'95vw'

      });
    } else {
      this.dialog.open(DialogLoginComponent, {
        height: 'auto',
        width: '40%'
      });
    }
    
  }

  logout(){
    this.user_service.removeUtente();
    this.logoutSocial() 
  }

  goTo(path:string){
    if('' !== path){
      this.route.navigate(['/' + path]);
    } else {
      this.route.navigate(['']);
    }
  }

  logoutSocial() {
    if(this.authService !== null) {
       this.authService.signOut();
    }
  }

}
