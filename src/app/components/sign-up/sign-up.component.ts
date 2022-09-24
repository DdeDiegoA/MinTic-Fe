import { Component, OnInit } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor() { }
  singUpForm: FormGroup;

  ngOnInit(): void {
    this.initForm()
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
