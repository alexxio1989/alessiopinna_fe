import { Component, Input, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-descrizioni',
  templateUrl: './descrizioni.component.html',
  styleUrls: ['./descrizioni.component.scss']
})
export class DescrizioniComponent implements OnInit {

  @Input() code: string;

  isMobile = false

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isMobile = this.deviceService.isMobile();
  }

}
