import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/dto/corso';
import { CorsoService } from 'src/app/service/corso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  corsi: Corso[];

  isMobile = false

  slideConfig = {
  };
  

  constructor(private corso_service: CorsoService , private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
    this.slideConfig = {
      "slidesToShow": this.isMobile ? 1.2 : 3.2,
      "slidesToScroll": 1,
      "dots": true,
      "infinite": false
    };
    this.corso_service.getCorsi().subscribe(next=>{
      this.corsi = next.corsi;
    },error =>{
      console.log(error)
    })
  }

  addSlide() {
    
  }

  removeSlide() {
    
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }

}
