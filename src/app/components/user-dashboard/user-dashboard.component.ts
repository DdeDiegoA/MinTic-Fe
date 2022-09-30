import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Role } from 'src/app/models/auth/role';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserService } from 'src/app/service/user/user.service';

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

  constructor(
    private route: ActivatedRoute,
    private dialog:MatDialog,
    private userDataService:UserService,
    private changeDetectorRefs: ChangeDetectorRef
    
    ) { 
    this.users=this.route.snapshot.data['response'];
    this.roles=this.route.snapshot.data['roleResponse']
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
  startEdit(user: User) {
    this.openEditDialog(user);
  }

  openEditDialog(user:User):void{
    const dialogRef =this.dialog.open(UserEditDialogComponent,{
      width:'250px',
      // data:{ seudonimo: this.users['seudonimo'], role:this.roles['name']}
    });

    dialogRef.componentInstance.roles=this.roles;
    dialogRef.componentInstance.updateUserForm.get('seudonimo')?.setValue(user.seudonimo);
    dialogRef.componentInstance.updateUserForm.get('role')?.setValue(user.role.name);
    dialogRef.componentInstance.userId = user.id;

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.updateUsersTableRequest()
      }
      // this.users['seudonimo']=res
    })
  }
  updateUsersTableRequest(){
    this.userDataService.getUser().subscribe({
      next: (x) =>{
        this.users = x;
        this.dataSource = new MatTableDataSource(this.users);
        this.changeDetectorRefs.detectChanges();    
      },
      error: (err)=>{
        // this.snackBar.open(err.error, 'cerrar', { duration: 2000 });
        alert('cambio detectado')
      }
    })

  }




  openConfirmDialog(userId:string):void{
    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      width:'300px',
      data:'¿Seguro desea borrar este usuario?'
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.userDataService.deleteUser(userId).subscribe({
          next:() =>{
            alert("se borro jaja")
          }
        }
        )
      }
      console.log(res);
    })

  }


  
}
