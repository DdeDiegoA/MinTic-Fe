import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeResponse } from 'src/app/models/auth/me-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  userInfo:MeResponse;

  constructor(private route:ActivatedRoute) { 
    this.userInfo= this.route.snapshot.data['response']
  }

  ngOnInit(): void {
    console.log(this.userInfo)
  }

}
