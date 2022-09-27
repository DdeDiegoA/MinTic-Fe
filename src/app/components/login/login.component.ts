import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.initForm()
  }

  // aqui va recibir los valores que se llenaron en el formulario
  doLogin(){
    this.authService.login(this.loginForm.value["email"],this.loginForm.value["password"]).subscribe(data => {
      console.log("login exitoso")
    }, err =>{
      console.log("login failed")
    })
    console.log(`Peticion http login ${JSON.stringify(this.loginForm.value)}`)
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