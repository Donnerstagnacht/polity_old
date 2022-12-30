import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  showCreateGroupMenu =  new BehaviorSubject<boolean>(false);
  showCreateEventMenu =  new BehaviorSubject<boolean>(false);

  constructor() { }

  showGroupMenu(): void {
    this.showCreateGroupMenu.next(true);
  }

  hideGroupMenu(): void {
    this.showCreateGroupMenu.next(false);
  }

  getGroupMenuStatus(): Observable<boolean> {
    return this.showCreateGroupMenu.asObservable();
  }

  showEventMenu(): void {
    this.showCreateEventMenu.next(true);
  }

  hideEventMenu(): void {
    this.showCreateEventMenu.next(false);
  }

  getEventMenuStatus(): Observable<boolean> {
    return this.showCreateEventMenu.asObservable();
  }
}
