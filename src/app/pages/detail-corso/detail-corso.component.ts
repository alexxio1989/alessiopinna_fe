import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Corso } from 'src/app/dto/corso';
import { CorsoService } from 'src/app/service/corso.service';

@Component({
  selector: 'app-detail-corso',
  templateUrl: './detail-corso.component.html',
  styleUrls: ['./detail-corso.component.scss']
})
export class DetailCorsoComponent implements OnInit {

  corso: Corso;

  constructor(private corso_service:CorsoService,private route: Router) { }

  ngOnInit(): void {
    this.corso = this.corso_service.getCorso();
  }

  indietro(){
    this.route.navigate(['']);
  }

}
