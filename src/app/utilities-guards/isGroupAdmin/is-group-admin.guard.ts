import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupsService } from 'src/app/groups/services/groups.service';

@Injectable({
  providedIn: 'root'
})
export class IsGroupAdminGuard implements CanActivate {
  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("AlwaysAuthGuard");
    const groupId: string = route.params['id'];
    const isAdmin: Promise<boolean> = this.groupsService.isLoggedInUserAdmin(groupId)
    .then((results) => {
      const isAdminResults = results.data.is_admin;
      if (isAdminResults) {
        return true
      } else {
        this.router.navigate(['/groups'])
        return false;
      }
    })
    .catch(() => {
      return false;
    });
    return isAdmin;

  }

}
