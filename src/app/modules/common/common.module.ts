import { LoginService } from './../Login/login.service'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { CommonComponent } from './common.component'
import { TieredMenuModule } from 'primeng/tieredmenu'
import { ButtonModule } from 'primeng/button'
import { AvatarGroupModule } from 'primeng/avatargroup'
import { SlideMenuModule } from 'primeng/slidemenu'
import { CalendarModule } from 'primeng/calendar'
import { MultiSelectModule } from 'primeng/multiselect'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { AvatarModule } from 'primeng/avatar'
import { ListPPCComponent } from '../list-ppc/list-ppc.component'
import { CommonRoutingModule } from './common-routing.module'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import { ProductService } from '../list-ppc/productservice'
import { ListUserComponent } from './../list-user/list-user.component'
import { CascadeSelectModule } from 'primeng/cascadeselect'
import { UserService } from '../list-user/userservice'
import { DialogModule } from 'primeng/dialog'
import { InputSwitchModule } from 'primeng/inputswitch'
import { CommonModule } from '@angular/common'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { SelectButtonModule } from 'primeng/selectbutton'
import { PasswordModule } from 'primeng/password'
import { PPCService } from 'src/app/services/apis/ppc.service'
import { DateCompactPipe } from 'src/app/pipes/date-pipe/date-compact.pipe'
import { ListUserService } from 'src/app/services/apis/user.service'

import { CommonService } from 'src/app/services/apis/common.service'
import { DateTimePipe } from 'src/app/pipes/date-pipe/date-time.pipe'
import { JwtInterceptor } from 'src/app/interceptors/jwt/jwt.interceptor'
import { RoleGuard } from 'src/app/guards/role.guard'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ToastModule } from 'primeng/toast'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { ListUserApporvalComponent } from '../list-user-approval/list-user-approval.component'
import { ListUserRequestComponent } from '../list-user-request/list-user-request.component'
import { UserRequestService } from 'src/app/services/apis/user-request.service'
import { ListPPCV3Component } from '../list-ppc-v3/list-ppc-v3.component'
import { PPCV3Service } from 'src/app/services/apis/ppc-v3.service'

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

@NgModule({
  imports: [
    TieredMenuModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    TieredMenuModule,
    SlideMenuModule,
    FormsModule,
    CalendarModule,
    MultiSelectModule,
    DropdownModule,
    CommonRoutingModule,
    InputTextModule,
    TableModule,
    HttpClientModule,
    CascadeSelectModule,
    DialogModule,
    InputSwitchModule,
    CommonModule,
    InputTextareaModule,
    SelectButtonModule,
    PasswordModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  declarations: [
    CommonComponent,
    ListPPCComponent,
    ListUserComponent,
    ListUserApporvalComponent,
    ListUserRequestComponent,
    DateCompactPipe,
    DateTimePipe,
    ListPPCV3Component,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ProductService,
    PPCService,
    ListUserService,
    UserRequestService,
    RoleGuard,
    CommonService,
    ConfirmationService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    PPCV3Service,
  ],
})
export class CustomCommonModule {}
