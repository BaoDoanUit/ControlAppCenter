import { SpinnerService } from './../../sharedComponent/spinner/spinner.service'
import { LoginService } from './login.service'
import { CustomValidator } from './../../validators/custom-validator'
import { MessageService } from 'primeng/api'

import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { UserRoleService } from 'src/app/services/app-services/role-update.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = ''
  password = ''
  show = false
  loginForm: FormGroup = new FormGroup({})
  constructor(
    private loginService: LoginService,
    private router: Router,
    private spinnerService: SpinnerService,
    private userRoleService: UserRoleService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.username = ''
    this.password = ''
    this.initFormGroup()
  }

  handleLogin(event?: any): void {
    if (this.loginForm.valid) {
      this.spinnerService.show()
      this.loginService.login(this.username, this.password).subscribe(
        (res) => {
          const roleBase64 = res.access_token.split('.')[1]
          const role = JSON.parse(atob(roleBase64)).auth
          localStorage.setItem('userId', res.user_id)
          localStorage.setItem('userRole', role)
          localStorage.setItem('accessToken', res.access_token)
          this.userRoleService.updateUserRole(role)

          if (role === 'admin') {
            this.router.navigate(['/common/list-ppc'])
          } else if (role === 'PPC') {
            this.router.navigate(['/common/list-ppc'])
          } else if (role === 'accountant') {
            this.router.navigate(['/common/list-ppc-v3'])
          } else {
            this.router.navigate(['/common'])
          }

          this.spinnerService.hide()
        },
        (err) => {
          // Toast err.error.message string
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          })
          this.spinnerService.hide()
        },
      )
    }
  }

  initFormGroup(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(4, 12) as ValidatorFn,
        CustomValidator.checkSpecialCharacter() as ValidatorFn,
      ]),
      password: new FormControl('', [
        CustomValidator.required() as ValidatorFn,
      ]),
    })
  }
}
