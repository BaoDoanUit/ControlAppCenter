import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserRoleService {
  userRole: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public roleId: BehaviorSubject<any>;
  constructor() {
    const role = localStorage.getItem('userRole');
    this.userRole.next(role || '');
    this.roleId = new BehaviorSubject<any>('');
  }
  get roleValue(): string {
    return this.userRole.value;
  }

  updateUserRole(role: string): void {
    this.userRole.next(role);
  }
}
