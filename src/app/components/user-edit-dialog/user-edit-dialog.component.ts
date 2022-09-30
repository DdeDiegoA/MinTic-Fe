import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/auth/role';
import { UserService } from 'src/app/service/user/user.service';

export interface DialogData {
  ID: string;
}
@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss']
})
export class UserEditDialogComponent implements OnInit {

  updateUserForm = new FormGroup({
    seudonimo: new FormControl("", [Validators.required]),
    role: new FormControl("",[]),
  });

  showPasswordIcon: string = 'visibility_off';
  showPasswordConfirmIcon: string = 'visibility_off';

  roles: Role[] = [];
  userId: string ='';

  constructor(
    private userDataService:UserService,
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data:DialogData
  ) {}

  ngOnInit(): void {
    
  }
  onClickNo(){
    this.dialogRef.close();
  }
  updateUserSubmit() {
    if (this.updateUserForm.valid) {
      this.userDataService.updateUser(
        this.userId,
        this.updateUserForm.value['role']!,
        this.updateUserForm.value['seudonimo']!
      ).subscribe({
        next: () => {
          // this.snackBar.open(`Creacion de usuario exitoso`, 'cerrar', { duration: 2000 });
          this.dialogRef.close(true);
        },
        error: (err) => {       
            console.log(err)  
          // this.snackBar.open(err.error, 'cerrar', { duration: 2000 });
         }
      });
    }
  }

  isInvalidField(field: string) {
    return this.updateUserForm.get(field)?.invalid && (this.updateUserForm.get(field)?.dirty || this.updateUserForm.get(field)?.touched);
  }

  hasError(field: string, validation: string) {
    return this.updateUserForm.get(field)?.hasError(validation);
  }

}
