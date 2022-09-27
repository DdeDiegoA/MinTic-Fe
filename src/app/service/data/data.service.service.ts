import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }
  loadingScreen: BehaviorSubject<boolean> = new BehaviorSubject(false);

  seudonimo: BehaviorSubject<string>= new BehaviorSubject('')

  isLogedIn: BehaviorSubject<boolean>= new BehaviorSubject(false)
}
