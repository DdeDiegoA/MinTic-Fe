import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TOKEN } from '../constants';
import { DataServiceService } from '../service/data/data.service.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
    constructor(private dataService:DataServiceService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.dataService.loadingScreen.next(true);
    let response: Promise<boolean> | boolean;
      if (localStorage.getItem(TOKEN) != null) {
      this.dataService.loadingScreen.next(false);
        response = this.router.navigate(['dashboard']);
    } else {
      this.dataService.loadingScreen.next(false);
      response = true;
    }
    return response;
  };
  }
  

