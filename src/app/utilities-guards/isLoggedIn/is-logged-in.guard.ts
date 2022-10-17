import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthentificationQuery } from 'src/app/authentification/state/authentification.query';
import { AuthentificationService } from '../../authentification/state/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private authentificationQuery: AuthentificationQuery,
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
          test = true;
          return test;
        } else {
          this.router.navigate(['/login'])
          test =true;
          // test = false; original setting
          return test;
        }
      }),
    )
  }

}
