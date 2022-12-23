import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Corso } from 'src/app/dto/corso';
import { CorsoService } from 'src/app/service/corso.service';
import { DelegateService } from 'src/app/service/delegate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  corsi: Corso[];

  isMobile = false

  mapCorsi = new Map<string, Corso[]>();

  slideConfig = {
  };
  

  constructor(private corso_service: CorsoService , private deviceService: DeviceDetectorService , private ds:DelegateService) { }

  ngOnInit(): void {
    this.corso_service.rmvCorso();
    this.isMobile = this.deviceService.isMobile();
    this.slideConfig = {
      "slidesToShow": 3,
      "slidesToScroll": 1,
      "dots": true,
      "infinite": false,
      "centerMode": true,
      "variableWidth": true,
      "responsive": [
        {
          "breakpoint": 1024,
          "settings": {
            "slidesToShow": 3,
            "slidesToScroll": 3,
            "centerMode": true,
            "variableWidth": true,
            "infinite": true,
            "dots": true
          }
        },
        {
          "breakpoint": 600,
          "settings": {
            "slidesToShow": 2,
            "slidesToScroll": 2,
            "centerMode": true,
            "variableWidth": true
          }
        },
        {
          "breakpoint": 480,
          "settings": {
            "slidesToShow": 1,
            "slidesToScroll": 1,
            "centerMode": true,
            "variableWidth": true
          }
        }
      ]
    
    };
    this.corso_service.getCorsi(false).subscribe(next=>{
      this.corsi = next.corsi;
      this.corsi .forEach(corso => {
        const listFiltred = this.mapCorsi.get(corso.tipo.descrizione);
        if(listFiltred){
          listFiltred.push(corso)
        } else {
          let newListFiltred = [];
          newListFiltred.push(corso)
          this.mapCorsi.set(corso.tipo.descrizione,newListFiltred);
        }
      });
      this.ds.sbjSpinner.next(false)
      if(!next.success){
        this.ds.sbjErrorsNotification.next(next.error)
      }
    },error =>{
      this.ds.sbjSpinner.next(false)
      this.ds.sbjErrorsNotification.next("Errore durante il recupero delle lezioni")
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
