import { ListPPCComponent } from './../list-ppc/list-ppc.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonComponent } from './common.component'
import { ListUserComponent } from './../list-user/list-user.component'
import { RoleGuard } from 'src/app/guards/role.guard'
import { ListUserApporvalComponent } from '../list-user-approval/list-user-approval.component'
import { ListUserRequestComponent } from '../list-user-request/list-user-request.component'
import { ListPPCV3Component } from '../list-ppc-v3/list-ppc-v3.component'

const routes: Routes = [
  {
    path: '',
    component: CommonComponent,
    children: [
      {
        path: 'list-ppc',
        component: ListPPCComponent,
        canActivate: [RoleGuard],
        data: { roleActive: 'PPC' },
      },
      {
        path: 'list-user',
        component: ListUserComponent,
        canActivate: [RoleGuard],
        data: { roleActive: 'admin' },
      },
      {
        path: 'list-user-approval',
        component: ListUserApporvalComponent,
        canActivate: [RoleGuard],
        data: { roleActive: 'admin' },
      },
      {
        path: 'list-user-request',
        component: ListUserRequestComponent,
        canActivate: [RoleGuard],
        data: { roleActive: 'admin' },
      },
      {
        path: 'list-ppc-v3',
        component: ListPPCV3Component,
        canActivate: [RoleGuard],
        data: { roleActive: 'admin|accountant' },
      },
    ],
  },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonRoutingModule {}
