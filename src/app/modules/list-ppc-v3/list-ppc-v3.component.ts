import { UserRoleService } from 'src/app/services/app-services/role-update.service'
import { CustomValidator } from '../../validators/custom-validator'
import {
  UserModel,
  ListCreateUserOption,
  ListApproveOption,
} from '../../models/listUser.model'
import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ListUser, ListUserOption } from 'src/app/models/listUser.model'
import { ListUserService } from 'src/app/services/apis/user.service'
import { SpinnerService } from 'src/app/sharedComponent/spinner/spinner.service'
import { FormControl, FormGroup, Validator, ValidatorFn } from '@angular/forms'
import { bank } from 'src/app/models/bank.model'
import { CommonService } from 'src/app/services/apis/common.service'
import { forkJoin } from 'rxjs'
import { max } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { PPCV3Service } from 'src/app/services/apis/ppc-v3.service'
import {
  PPCDetailModel,
  PPCItemModel,
  PPCV3Model,
} from 'src/app/models/ppc.model'
import { ListPPc } from 'src/app/mocks/data'
import { PPCService } from 'src/app/services/apis/ppc.service'
import Utils from '../helper/utils'

@Component({
  selector: 'app-list-ppc-v3',
  templateUrl: './list-ppc-v3.component.html',
  styleUrls: ['./list-ppc-v3.component.scss'],
})
export class ListPPCV3Component implements OnInit {
  disabled = true
  UserOtion: any[] = ListUserOption
  ApproveOption: any[] = ListApproveOption
  createUserOption = ListCreateUserOption
  ppcDetailData: PPCDetailModel = new PPCDetailModel({})
  Listpackage: PPCV3Model[] = []
  selectedUserId = '3'
  selectedOption = '0'
  packageId = 0
  searchKeyWord = ''
  displayDialogAdmin = false
  displayDialogUser = false
  displayNewUser = false
  packageIdSelect: string = ''
  displayDetailPPC = false
  checked = false
  searchKeywords = ''
  ppcList: PPCItemModel[] = []
  Bank: bank[] = []
  selectedBank = ''
  isCondition: boolean = false

  username = ''
  email = ''
  usernamebank = ''
  shopAddress = ''
  shopname = ''
  shopcode = ''
  roleid: any = ''
  phone: any = ''
  password = ''
  idcard = ''
  bankname = ''
  accountnumber = ''
  showInfoForSO = false
  isShopCodeValid = true
  userDetailData: UserModel = new UserModel({})
  detailData: ListUser = new ListUser({})
  isEditUserDetail = false
  editAdminData: any
  editUserData: any
  rangeDates: any 
  displayPhoto: boolean = false
  imagetoshowdetailUrl: string = ''

  createUserForm: FormGroup = new FormGroup({})
  admindetails: FormGroup = new FormGroup({})
  userdetailsfrom: FormGroup = new FormGroup({})
  constructor(
    private userService: ListUserService,
    private ppcv3Service: PPCV3Service,
    private spinnerService: SpinnerService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translate: TranslateService,
    private ppcService: PPCService,
  ) {}

  ngOnInit(): void {
    this.username = ''
    this.email = ''
    this.usernamebank = ''
    this.shopAddress = ''
    this.shopcode = ''
    this.shopname = ''
    this.roleid = ''
    this.phone = ''
    this.password = ''
    this.idcard = ''
    this.bankname = ''
    this.accountnumber = ''
    this.rangeDates = [Utils.addDays(new Date(), -30), new Date()]
    this.handleGetListUser()
    this.initFormGroup()
  }
  checkCondition(data: any, target: number, qty: number) {
    const totalReject = data.filter((d: any) => d.status == 'Reject').length
    const totalApproved = data.filter((d: any) => d.status == 'Approved').length
    if (totalReject > 0 || totalApproved == qty) return false
    if ((totalApproved / qty) * 100 >= target) return true
    return false
  }
  showDialog(packageId: string, target: number, qty: number): void {
    this.isCondition = false
    this.displayDialogUser = true
    this.packageIdSelect = packageId
    this.spinnerService.show()
    this.ppcv3Service.getPPCV3Detail(packageId).subscribe(
      (data) => {
        this.ppcList = data
        this.isCondition = this.checkCondition(data, target, qty)
        this.spinnerService.hide()
      },
      (err) => {
        this.spinnerService.hide()
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        })
      },
    )
  }
  getDateStringFromDateObject(date: Date): string {
    const year = date.getFullYear()
    const month =
      date.getMonth() > 8 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
    const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`
    return `${year}-${month}-${day}`
  }

  handleGetListUser(): void {
    console.log(this.rangeDates)
    if (typeof this.rangeDates == 'undefined' || this.rangeDates?.length < 2) {
      console.log(this.rangeDates)
      this.Listpackage = []
    } else {
      this.spinnerService.show()
      this.ppcv3Service
        .getListPPCV3({
          keyWord: this.searchKeyWord,
          end:
            (this.rangeDates &&
              this.rangeDates[1] &&
              this.getDateStringFromDateObject(this.rangeDates[1])) ||
            '',
          start:
            (this.rangeDates &&
              this.rangeDates[0] &&
              this.getDateStringFromDateObject(this.rangeDates[0])) ||
            '',
          statusId: this.selectedOption || '',
        })
        .subscribe(
          (res) => {
            console.log(res)
            this.Listpackage = res
            this.spinnerService.hide()
          },
          (error) => {
            this.spinnerService.hide()
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
            })
          },
        )
    }
  }

  handleCreate(): void {
    this.spinnerService.show()
    console.log(this.bankname)
    this.userService
      .postCreateUser(
        this.accountnumber,
        this.bankname,
        this.email,
        this.idcard,
        this.password,
        this.phone,
        this.roleid,
        this.shopAddress,
        this.shopcode,
        this.shopname,
        this.username,
        this.usernamebank,
      )
      .subscribe(
        (res) => {
          this.displayNewUser = false
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create success!',
          })
          this.handleGetListUser()
          this.createUserForm.reset()
          this.showInfoForSO = false
        },
        (error) => {
          this.spinnerService.hide()
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          })
        },
      )
  }

  handleChangeActiveUser(user: any): void {
    const message = user.isActive
      ? this.translate.instant('activated.title')
      : this.translate.instant('inactivated.title')
    this.confirmationService.confirm({
      message,
      accept: () => {
        this.spinnerService.show()
        this.userService.getUserDetail(user.id).subscribe((res) => {
          const {
            accountNumber,
            avatar,
            bankName,
            email,
            idCard,
            isActive,
            phone,
            shopAddress,
            shopName,
            shopCode,
            userName,
            userNameBank,
            id,
          } = res

          const dataUpdate = {
            account_number: accountNumber,
            avatar,
            bank_name: bankName,
            email,
            id_card: idCard,
            is_active: !isActive,
            phone,
            shop_Address: shopAddress,
            shop_code: shopCode,
            shop_name: shopName,
            user_name: userName,
            user_name_bank: userNameBank,
            user_id: id,
          }

          this.userService.updateUserDetail(dataUpdate).subscribe(
            () => {
              this.spinnerService.hide()
              this.userDetailData = new UserModel({})
              this.messageService.add({
                severity: 'success.',
                summary: 'Success',
                detail: 'Update success!',
              })
            },
            (error) => {
              this.spinnerService.hide()
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.error.message,
              })
              setTimeout(() => {
                user.isActive = !user.isActive
              })
            },
          )
        })
      },
      reject: () => {
        setTimeout(() => {
          user.isActive = !user.isActive
        })
      },
    })
  }

  handleUpdateUser(isChangeActive?: boolean): void {
    this.confirmationService.confirm({
      message: 'update',
      accept: () => {
        this.spinnerService.show()
        const {
          accountNumber,
          avatar,
          bankName,
          email,
          idCard,
          isActive,
          phone,
          shopAddress,
          shopName,
          shopCode,
          userName,
          userNameBank,
          id,
        } = this.userDetailData

        const dataUpdate = {
          account_number: accountNumber,
          avatar,
          bank_name: bankName,
          email,
          id_card: idCard,
          is_active: isChangeActive ? !isActive : isActive,
          phone,
          shop_Address: shopAddress,
          shop_code: shopCode,
          shop_name: shopName,
          user_name: userName,
          user_name_bank: userNameBank,
          user_id: id,
        }

        this.userService.updateUserDetail(dataUpdate).subscribe(
          (res) => {
            this.spinnerService.hide()
            this.handleGetListUser()
            this.messageService.add({
              severity: 'success',
              summary: 'Succes',
              detail: 'Update success!',
            })
            this.userDetailData.isActive = isChangeActive ? !isActive : isActive
            this.displayDialogAdmin = false
          },
          (error) => {
            this.spinnerService.hide()
            this.messageService.add({
              severity: 'success',
              summary: 'Error',
              detail: error.error.message,
            })
          },
        )
      },
    })
  }

  handleChangeRole(): void {
    this.showInfoForSO = this.roleid === 3
    if (this.showInfoForSO) {
      this.createUserForm.addControl(
        'accountnumber',
        new FormControl('', [
          CustomValidator.required() as ValidatorFn,
          CustomValidator.rangeLength(6, 15) as ValidatorFn,
          CustomValidator.positiveNumber() as ValidatorFn,
        ]),
      )
      this.createUserForm.addControl(
        'usernamebank',
        new FormControl('', [
          CustomValidator.required() as ValidatorFn,
          CustomValidator.maxLength(50) as ValidatorFn,
        ]),
      )
      this.createUserForm.addControl(
        'shopcode',
        new FormControl('', [
          CustomValidator.required() as ValidatorFn,
          CustomValidator.rangeLength(6, 6) as ValidatorFn,
          CustomValidator.positiveNumber() as ValidatorFn,
        ]),
      )
    } else {
      this.createUserForm.removeControl('accountnumber')
      this.createUserForm.removeControl('usernamebank')
      this.createUserForm.removeControl('shopcode')
    }

    this.shopname = ''
    this.shopcode = ''
    this.bankname = ''
    this.accountnumber = ''
    this.usernamebank = ''
  }

  handleApproveAll(): void {
    this.spinnerService.show()
    console.log(localStorage.getItem('userId'), this.packageIdSelect);
    this.ppcv3Service.approveAll(parseInt(this.packageIdSelect)).subscribe(
      (res) => {
        console.log(res);
        this.spinnerService.hide()
        this.displayDialogUser = false
        if(res.status?.toLowerCase() == 'ok'){
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail:'Approval all success!'
          })
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Warning',
            detail:'No PPC approve!'
          })
        }
    
        this.handleGetListUser()
      },
      (err) => {
        this.displayDialogUser = false
        this.spinnerService.hide()
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message,
        })
      },
    )
  }

  getShopNameByShopCode(): void {
    this.spinnerService.show()

    this.commonService.getShopNameByShopCode(this.shopcode).subscribe(
      (res) => {
        this.shopname = res.shop_name
        this.isShopCodeValid = res.exist_status
        this.spinnerService.hide()
      },
      (error) => {
        this.spinnerService.hide()
      },
    )
  }

  initFormGroup(): void {
    this.createUserForm = new FormGroup({
      userName: new FormControl('', [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(4, 12) as ValidatorFn,
        CustomValidator.checkSpecialCharacter() as ValidatorFn,
      ]),
      email: new FormControl('', [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.email() as ValidatorFn,
      ]),
      idCard: new FormControl('', [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(9, 10) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      phone: new FormControl('', [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(10, 11) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      roleId: new FormControl('', [CustomValidator.required() as ValidatorFn]),
      shopAddress: new FormControl('', [
        CustomValidator.required() as ValidatorFn,
      ]),
      bankName: new FormControl(''),
    })
  }

  takePhoto(url: string): void {
    this.displayPhoto = true
    // this.displayDetailPPC = false;
    this.imagetoshowdetailUrl = url
  }

  showModal(id: string): void {
    this.displayDetailPPC = true
    this.spinnerService.show()
    this.handlePPCDetailList(id)
  }

  handlePPCDetailList(packageId: string) {
    this.ppcv3Service.getPPCDetail(packageId).subscribe(
      (res) => {
        this.ppcDetailData = res
        this.spinnerService.hide()
      },
      (error) => {
        this.spinnerService.hide()
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        })
      },
    )
  }

  handleUpdate(status: string): void {
    this.confirmationService.confirm({
      message: 'updatePPC',
      accept: () => {
        const {
          id,
          customerName,
          customerPhone,
          modelName,
          selloutDate,
          serialNumber,
          note,
          validation,
          comment
        } = this.ppcDetailData
        const dataCheckValidate = {
          comment,
          id,
          customer_name: customerName,
          customer_phone: customerPhone,
          model_name: modelName,
          note,
          sell_out_date: selloutDate,
          serial_number: serialNumber,
          status,
          validation,
        }

        this.spinnerService.show()
        this.ppcv3Service.updatePPC(dataCheckValidate).subscribe(
          () => {
            this.spinnerService.hide()
            setTimeout(() => {
              this.displayDetailPPC = false
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Update success!',
              })
              this.handlePPCDetailList(this.packageIdSelect)
            }, 50)
          },
          (error) => {
            this.spinnerService.hide()
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.message,
            })
          },
        )
      },
    })
  }

  handleCheckValidate(): void {
    const {
      customerName,
      customerPhone,
      id,
      modelName,
      selloutDate,
      serialNumber,
    } = this.ppcDetailData
    const dataCheckValidate = {
      customer_name: customerName,
      customer_phone: customerPhone,
      id,
      model_name: modelName,
      sell_out_date: selloutDate,
      serial_number: serialNumber,
    }

    this.spinnerService.show()
    this.ppcService.getSerialNumber(this.ppcDetailData.serialNumber).subscribe(
      (data) => {
        this.ppcDetailData.modelName = data.model_name
        this.ppcService.checkValidation(dataCheckValidate).subscribe(
          (res) => {
            this.ppcDetailData.validation = res
            this.spinnerService.hide()
          },
          () => {
            this.spinnerService.hide()
          },
        )
      },
      () => {
        this.spinnerService.hide()
      },
    )
  }
}
