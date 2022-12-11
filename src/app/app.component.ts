import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarService } from './service/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
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
