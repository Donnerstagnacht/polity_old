import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
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
    route: ActivatedRouteSnapshot
  ): Promise<boolean> {
    const groupId: string = route.params['id'];
    try {
      await this.groupsService.isLoggedInUserAdmin(groupId);
      return true;
    } catch(error: any) {
      this.router.navigate(['/groups']);
      return false;
    }
  }
}
