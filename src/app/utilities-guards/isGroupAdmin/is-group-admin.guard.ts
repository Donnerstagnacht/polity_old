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

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    console.log("Admin guard");
    const groupId: string = route.params['id'];
    try {
      await this.groupsService.isLoggedInUserAdmin(groupId)
      return true;
    } catch(error: any) {
      console.log('no admin')
      this.router.navigate(['/groups'])
      return false;
    }
  }
}
