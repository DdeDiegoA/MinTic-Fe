import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, from, map, Observable, of, throwError } from 'rxjs';
import { TOKEN } from 'src/app/constants';
import { Role } from 'src/app/models/auth/role';
import { CreateUser } from 'src/app/models/user/create-user';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';
import { DataServiceService } from '../data/data.service.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  ENDPOINT = 'user/';
  ENDPOINTROLE = 'role/';

  constructor(
    private _http: HttpClient,
    private dataService: DataServiceService,
    private router: Router
  ) {}

  getRoles(): Observable<Role[]> {
    this.dataService.loadingScreen.next(true);
    return this._http
      .get<Role[]>(`${environment.gateWayUrl}${this.ENDPOINTROLE}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        },
      })
      .pipe(
        map((body) => {
          this.dataService.loadingScreen.next(false);
          return body;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          return throwError(() => err);
        })
      );
  }

  getUser(): Observable<User[]> {
    this.dataService.loadingScreen.next(true);
    return this._http
      .get<User[]>(`${environment.gateWayUrl}${this.ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        },
      })
      .pipe(
        map((body) => {
          this.dataService.loadingScreen.next(false);
          return body;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);
          this.router.navigate(['/']);
          return throwError(() => err);
        })
      );
  }
  updateUser(id: string, roleId: string, seudonimo: string): Observable<User> {
    this.dataService.loadingScreen.next(true);
    return this._http
      .put<User>(
        `${environment.gateWayUrl}${this.ENDPOINT}${id}`,
        {
          roleId,
          seudonimo,
        },
        {
          observe: 'response',
          headers: {
            authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
          },
        }
      )
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);

          return response.body!;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);

          return throwError(() => err);
        })
      );
  }

  deleteUser(id: string): Observable<User> {
    this.dataService.loadingScreen.next(true);
    return this._http
      .delete<User>(`${environment.gateWayUrl}${this.ENDPOINT}${id}`, {
        observe: 'response',
        headers: {
          authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
        },
      })
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);

          return response.body!;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);

          return throwError(() => err);
        })
      );
  }
  crateUser(
    email: string,
    seudonimo: string,
    password: string
  ): Observable<User> {
    this.dataService.loadingScreen.next(true);
    return this._http
      .post<User>(`${environment.gateWayUrl}${this.ENDPOINT}create`, {
        email,
        seudonimo,
        password,
      })
      .pipe(
        map((response) => {
          this.dataService.loadingScreen.next(false);
          return response;
        }),
        catchError((err) => {
          this.dataService.loadingScreen.next(false);

          return throwError(() => err);
        })
      );
  }
}
