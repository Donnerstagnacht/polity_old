import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, take, tap } from 'rxjs';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { AuthentificationService } from '../../authentification/state/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private authentificationQuery: AuthentificationQuery,
    private authentificationService: AuthentificationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let test
    return this.authentificationQuery.uuid$.pipe(
      take(1),
      map(uuid => {

        if (uuid) {
          console.log('uuid');
          console.log(uuid);
          test = true;
          return test;
        } else {
          this.router.navigate(['/login'])
          test = false;
          return test;
        }
/*
      if(isAuthenticated){
        console.log('not a allow')
        this.router.navigate(['']);
          return false
      }

        console.log('allowe to show')
        return true
       //return of(true) give me the same resault

       /*
       if (uuid) {
          console.log('uuid');
          console.log(uuid);
          test = true;
          return test;
        } else {
          this.router.navigate(['/login'])
          test = false;
          return test;
        }*/
      }),
    )
  }

}
