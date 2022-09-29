import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/service/data/data.service.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  nombre: string;

  constructor(
    private dataService: DataServiceService,
    private authService: AuthService
  ) {
    this.isLoggedIn = false;
    this.nombre = '';
  }

  ngOnInit(): void {
    this.dataService.isLogedIn.subscribe((x) => {
      this.isLoggedIn = x;
    });
    this.dataService.seudonimo.subscribe((x) => {
      this.nombre = x;
    });
  }
  logout() {
    this.authService.logout()
  }
}
