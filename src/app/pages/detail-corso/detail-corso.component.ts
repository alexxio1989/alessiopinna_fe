import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/dto/corso';
import { CorsoService } from 'src/app/service/corso.service';

@Component({
  selector: 'app-detail-corso',
  templateUrl: './detail-corso.component.html',
  styleUrls: ['./detail-corso.component.scss']
})
export class DetailCorsoComponent implements OnInit {

  corso: Corso;

  isMobile: boolean;

  constructor(private corso_service:CorsoService,private route: Router ,private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.corso = this.corso_service.getCorso(); 
    this.isMobile = this.deviceService.isMobile();
  }

  indietro(){
    this.route.navigate(['']);
  }

}
