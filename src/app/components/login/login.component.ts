import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  // aqui va recibir los valores que se llenaron en el formulario
  doLogin(){
    console.log('Peticion http login ${JSON.stringify(this.loginForm.value)}')
  }

  hasError(field: string): boolean{
    return this.loginForm.get(field).invalid
  }

  hasErrorForValidation(field: string, validation: string): boolean{
    return this.loginForm.get(field).hasError(validation)
  }

  private initForm(){
    this.loginForm = new FormGroup({
      email: new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(8)])
    })
  }

}