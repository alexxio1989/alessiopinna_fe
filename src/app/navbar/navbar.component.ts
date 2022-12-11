import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../service/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  openSide = false;

  constructor(private navService: SidebarService) { }

  ngOnInit(): void {
  }

  openSideBar(){
    this.openSide = !this.openSide;
    this.navService.sbjOpenSide.next(this.openSide)
  }

}
