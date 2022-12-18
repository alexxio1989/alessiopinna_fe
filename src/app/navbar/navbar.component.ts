import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(private navService: SidebarService,private user_service:UtenteService , public dialog: MatDialog , private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.user_service.notifyUtenteLogged.asObservable().subscribe(next=>{
      this.userLogged = next;
      this.isUtenteLogged = next !== undefined && next !== null;
    })

    this.userLogged = this.user_service.getUtente();
    this.isUtenteLogged = this.userLogged !== undefined && this.userLogged !== null;
  }

  openSideBar(){
    this.openSide = !this.openSide;
    this.navService.sbjOpenSide.next(this.openSide)
  }

  openLogin(){
    if(this.deviceService.isMobile()){
      this.dialog.open(DialogLoginComponent, {
        width: '90%'
      });
    } else {
      this.dialog.open(DialogLoginComponent, {
        height: '82%',
        width: '60%'
      });
    }
    
  }

}
