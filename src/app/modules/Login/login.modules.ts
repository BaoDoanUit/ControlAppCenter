import { LoginService } from './login.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { LoginRoutingModule } from './login-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { SlideMenuModule } from 'primeng/slidemenu';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { LoginComponent } from './login.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
@NgModule({
  imports: [
    TieredMenuModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    SlideMenuModule,
    InputTextModule,
    RippleModule,
    CalendarModule,
    MultiSelectModule,
    LoginRoutingModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ToggleButtonModule,
    ToastModule
  ],
  declarations: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService]
})
export class LoginModule {}
