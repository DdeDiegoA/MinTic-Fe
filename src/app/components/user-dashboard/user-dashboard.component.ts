import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Role } from 'src/app/models/auth/role';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit , AfterViewInit {

  users:User[] = [];
  
  
  displayedColumns: string[] = ['email', 'seudonimo', 'role', 'editar','eliminar'];
  columnas=[
    {titulo:"Email", name:"email"},
    {titulo:"Nombre", name:"seudonimo"},

  ]
  dataSource: MatTableDataSource<User>;
  roles:Role[]=[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute) { 
    this.users=this.route.snapshot.data['response'];
    this.roles=this.route.snapshot.data['role']
    this.dataSource = new MatTableDataSource(this.users)
  }
  ngOnInit(): void {
    

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
