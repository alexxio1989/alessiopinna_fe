import { Component, OnInit } from '@angular/core';
import { Corso } from 'src/app/dto/corso';
import { CorsoService } from 'src/app/service/corso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  corsi: Corso[];

  constructor(private corso_service: CorsoService) { }

  ngOnInit(): void {
    this.corso_service.getCorsi().subscribe(next=>{
      this.corsi = next.corsi;
    },error =>{
      console.log(error)
    })
  }

}
