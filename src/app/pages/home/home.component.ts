import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarService } from 'src/app/service/sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('drawer') drawerComp: MatDrawer;

  showFiller = false;

  openSide = false;

  constructor(private navService: SidebarService) { }

  ngOnInit(): void {
    this.navService.sbjOpenSide.asObservable().subscribe(next=>{
      this.openSide = next;
      if(this.openSide){
        this.drawerComp.open()
      } else{
        this.drawerComp.close()
      }
    })
  }

}
