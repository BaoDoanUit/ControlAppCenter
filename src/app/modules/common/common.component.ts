import { ListUserService } from 'src/app/services/apis/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserRoleService } from 'src/app/services/app-services/role-update.service';
import { SpinnerService } from 'src/app/sharedComponent/spinner/spinner.service';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {

  userRole = '';
  currentPage = '';
  userInfo: any;
  imgUrl: any;
  constructor(
    private router: Router,
    private userRoleService: UserRoleService,
    private userService: ListUserService,
    private spinner: SpinnerService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPage = event.url.split('/')[2] || '';
      }
    });
  }
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit(): void {
    this.spinner.show();
    this.userRoleService.userRole.subscribe((role) => {
      this.userRole = role;
      this.userService.getUserDetail(localStorage.getItem('userId')).subscribe((res) => {
        console.log(this.userInfo);
        this.userInfo = res;
        this.imgUrl = res.avatar;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      });
    }, () => {
      this.spinner.hide();
    });
  }

  handleLogout(): void {
    localStorage.removeItem('accessToken');
    localStorage.clear();
    this.router.navigate(['/common/login']);
  }
}
