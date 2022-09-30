import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';
import { TOKEN } from 'src/app/constants';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../data/data.service.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  ENDPOINT='user/'
  constructor(
    private _http:HttpClient,
    private dataService: DataServiceService,
    private router: Router
  ) {}

    getUser(): Observable<User[]>{
      this.dataService.loadingScreen.next(true)
      return this._http.get<User[]>(`${environment.gateWayUrl}${this.ENDPOINT}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        },
      })
      .pipe(
        map((body)=>{
          this.dataService.loadingScreen.next(false);
          return body
      }),
      catchError((err)=>{
        this.dataService.loadingScreen.next(false);
        this.router.navigate(['/'])
        return throwError(()=>err)
      })
      
      )
    }

}