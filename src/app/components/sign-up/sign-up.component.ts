import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  icon: string;
  constructor(
    private UserService:UserService
  ) {
    this.icon = 'visibility_off';
  }
  singUpForm: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  toggleIcon() {
    if (this.icon === 'visibility_off') {
      this.icon = 'visibility';
    } else {
      this.icon = 'visibility_off';
    }
  }

  doSingUp() {
    this.UserService.crateUser(
      this.singUpForm.value["email"],
      this.singUpForm.value["name"], 
      this.singUpForm.value["password"]
    ).subscribe({
      next:()=>{
        alert('Creacion creacionada')
      },
      error:(err)=>{
        alert(err.error)
      }
    })

  }

  hasError(field: string): boolean {
    return this.singUpForm.get(field).invalid;
  }

  hasErrorForValidation(field: string, validation: string): boolean {
    return this.singUpForm.get(field).hasError(validation);
  }
 

  private initForm() {
    this.singUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
}
