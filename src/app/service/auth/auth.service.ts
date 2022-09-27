import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { DataServiceService } from '../data/data.service.service';
import { environment } from 'src/environments/environment';
import { catchError, from, map, Observable, throwError } from 'rxjs';
import { LoginResponse } from 'src/app/models/auth/loginResponse.model';
import { TOKEN } from 'src/app/constants';
import {  Router, UrlTree } from '@angular/router';
import { MeResponse } from 'src/app/models/auth/me-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  ENDPOINT = "auth/"
  


  constructor(private _http: HttpClient, private dataService: DataServiceService, private router:Router) { }
  login(email:String, password:String): Observable<LoginResponse>{
    this.dataService.loadingScreen.next(true)
      return this._http.post<LoginResponse>(`${environment.sbeUrl}${this.ENDPOINT}`,{
      email,
      password
    }
    ).pipe(map(body =>{
      localStorage.setItem(TOKEN,body.access_token)
      this.dataService.isLogedIn.next(true)
      this.router.navigate(['dashboard'])
      this.dataService.loadingScreen.next(false)
      return body
    }), catchError((err)=>{
      this.dataService.loadingScreen.next(false)
      this.dataService.isLogedIn.next(false)
      return throwError(()=> "credenciales invalidas")
    }))
  }

  authMe():Observable<boolean | UrlTree> {
    this.dataService.loadingScreen.next(true)
    let response:Observable<boolean|UrlTree>;
    if (localStorage.getItem(TOKEN)!=null){
      response =this._http.get<MeResponse>(`${environment.sbeUrl}${this.ENDPOINT}me`,{
        observe:'body',
        headers:{

          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`
        }
    }).pipe(map(body =>{
      console.log(body)
      localStorage.setItem('role',body.role.name)
      localStorage.setItem('user',JSON.stringify(body))
      this.dataService.seudonimo.next(body.seudonimo)
      this.dataService.isLogedIn.next(true)
      this.dataService.loadingScreen.next(false)
      return true
      
    }),catchError((err)=>{
        localStorage.removeItem(TOKEN)
        localStorage.removeItem('role')
        localStorage.removeItem('user')
        this.dataService.seudonimo.next('')
        this.dataService.isLogedIn.next(false)
        this.dataService.loadingScreen.next(false)
      return this.router.navigate(['login'])
        
      })

    )
  } else{
    response= from(this.router.navigate(['login']))
    this.dataService.isLogedIn.next(false)
    this.dataService.loadingScreen.next(false)
  }
   return response

}}
