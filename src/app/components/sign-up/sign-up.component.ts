import { Component, OnInit } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  icon:string;
  constructor() {this.icon='visibility_off' }
  singUpForm: FormGroup;

  ngOnInit(): void {
    this.initForm()
  }

  toggleIcon(){
    if (this.icon === 'visibility_off'){
      this.icon='visibility'
    } else{
      this.icon = 'visibility_off'
    }
  }

  doSingUp(){
    console.log('Peticion http login ${JSON.stringify(this.loginForm.value)}')
  }

  hasError(field: string): boolean{
    return this.singUpForm.get(field).invalid
  }

  hasErrorForValidation(field: string, validation: string): boolean{
    return this.singUpForm.get(field).hasError(validation)
  }
  
  private initForm(){
    this.singUpForm = new FormGroup({
      email: new FormControl("",[Validators.required, Validators.email]),
      name: new FormControl("",[Validators.required, Validators.minLength(8)]),
      password: new FormControl("",[Validators.required, Validators.minLength(8)])
    })
  }
}
