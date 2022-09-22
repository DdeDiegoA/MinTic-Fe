import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './service/data/data.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  showLoadingScreen: boolean = false;

  constructor(private dataService: DataServiceService){}

  ngOnInit(): void {
    // suscribirse al servicio, aca se recibe el valor que la variable tiene
    this.dataService.loadingScreen.subscribe(x => {
      this.showLoadingScreen = x
    })
  }
}
