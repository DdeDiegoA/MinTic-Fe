import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeResponse } from 'src/app/models/auth/me-response';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInfo:MeResponse;

  constructor(private route:ActivatedRoute) { 
    this.userInfo= this.route.snapshot.data['response']
  }

  ngOnInit(): void {
  }

}
