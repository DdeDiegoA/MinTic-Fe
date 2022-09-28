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
  icon:string;

  constructor(private authService:AuthService) {

    this.icon='visibility_off' 
  
  }

  

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

  // aqui va recibir los valores que se llenaron en el formulario
  doLogin(){
    this.authService.login(this.loginForm.value["email"],this.loginForm.value["password"]).subscribe(data => {
      console.log("login exitoso")
    }, err =>{
      console.log("login failed")
    })
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