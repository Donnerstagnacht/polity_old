import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  showCreateGroupMenu =  new BehaviorSubject<boolean>(false);

  constructor() { }

  showGroupMenu(): void {
    this.showCreateGroupMenu.next(true);
  }

  hideGroupMenu(): void {
    this.showCreateGroupMenu.next(false);
  }

  getMenuStatus(): Observable<boolean> {
    return this.showCreateGroupMenu.asObservable();
  }


}
