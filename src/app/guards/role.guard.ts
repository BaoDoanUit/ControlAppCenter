import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { UserRoleService } from '../services/app-services/role-update.service'

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private userRoleService: UserRoleService,
    private router: Router,
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const roleActive = route.data.roleActive
    const currentRole = this.userRoleService.roleValue
    if (roleActive) {
      if (roleActive.includes(currentRole) || currentRole === 'admin') {
        return true
      }
      this.router.navigate([`/common`])
      return false
    } else {
      return true
    }
  }
}
