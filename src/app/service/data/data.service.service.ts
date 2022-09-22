import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  loadingScreen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }
}
