import { UserRoleService } from 'src/app/services/app-services/role-update.service'
import { CustomValidator } from '../../validators/custom-validator'
import {
  UserModel,
  ListCreateUserOption,
  ListApproveOption,
  ListRequest,
  ListRequestOption,
  RequestDetail,
} from '../../models/listUser.model'
import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ListUser, ListUserOption } from 'src/app/models/listUser.model'
import { ListUserService } from 'src/app/services/apis/user.service'
import { SpinnerService } from 'src/app/sharedComponent/spinner/spinner.service'
import { FormControl, FormGroup, Validator, ValidatorFn } from '@angular/forms'
import { bank } from 'src/app/models/bank.model'
import { CommonService } from 'src/app/services/apis/common.service'
import { forkJoin, of } from 'rxjs'
import { max } from 'rxjs/operators'
import { TranslateService } from '@ngx-translate/core'
import { UserRequestService } from 'src/app/services/apis/user-request.service'

@Component({
  selector: 'app-list-user-request',
  templateUrl: './list-user-request.component.html',
  styleUrls: ['./list-user-request.component.scss'],
})
export class ListUserRequestComponent implements OnInit {
  disabled = true
  UserOtion: any[] = ListUserOption
  ApproveOption: any[] = ListApproveOption
  RequestOption: any[] = ListRequestOption
  createUserOption = ListCreateUserOption
  Listuser: ListRequest[] = []
  selectedUserId = '3'
  selectedOption = '0'
  requestTypeOption = '1'

  searchKeyWord = ''
  displayDialogAdmin = false
  displayDialogUser = false
  displayNewUser = false
  checked = false
  searchKeywords = ''

  Bank: bank[] = []
  selectedBank = ''

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
  detailData: RequestDetail = new RequestDetail({})
  isEditUserDetail = false
  editAdminData: any
  editUserData: any
  displayPhoto: boolean = false
  imagetoshowdetailUrl: string = ''

  createUserForm: FormGroup = new FormGroup({})
  admindetails: FormGroup = new FormGroup({})
  userdetailsfrom: FormGroup = new FormGroup({})
  constructor(
    private userService: ListUserService,
    private spinnerService: SpinnerService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translate: TranslateService,
    private userRequestService: UserRequestService,
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
    this.handleGetListUser()
  }

  showDialog(id: string): void {
    this.displayDialogUser = true

    this.spinnerService.show()
    // if (userRole === 'admin' || userRole === 'PPC') {
    //   this.displayDialogUser = true
    // }
    // if (userRole === 'SO') {
    //   this.displayDialogUser = true
    //   // this.handleGetListBank();
    // }
    console.log(id)
    forkJoin([
      this.userRequestService.getRequestDetail(id),
      this.commonService.getBank(),
    ]).subscribe(
      ([requestDetail, listBankData]) => {
        // this.detailData = userData
        console.log(requestDetail)
        this.editUserData = JSON.parse(JSON.stringify(requestDetail))
        this.detailData = requestDetail
        this.detailData.id = id
        this.detailData.approve = this.Listuser.filter(
          (d) => (d.id = id),
        )[0].approve
        console.log(this.detailData)
        this.initFormEditUser()
        this.Bank = listBankData
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
  showNewUser(): void {
    this.displayNewUser = true
    this.handleGetListBank()
  }

  handleApproveUserRequest(id: string, approve: string) {
    this.detailData.approve = approve
    this.userRequestService.approveRequest(id, this.detailData).subscribe(
      (res) => {
        this.displayDialogUser = false
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Approval user success!',
        })
        this.handleGetListUser()
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

  handleGetListUser(): void {
    this.spinnerService.show()
    this.userRequestService
      .getListRequest({
        keyWord: this.searchKeywords,
        role: this.selectedUserId,
        request_type: this.requestTypeOption,
        approve: this.selectedOption,
      })
      .subscribe(
        (res) => {
          console.log(res)
          this.Listuser = res
          this.spinnerService.hide()
          this.shopAddress = ''
          this.shopcode = ''
          this.shopname = ''
          this.bankname = ''
          this.accountnumber = ''
          this.usernamebank = ''
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

  handleGetListBank(): void {
    this.spinnerService.show()
    this.commonService.getBank().subscribe((res) => {
      this.Bank = res
      this.spinnerService.hide()
    })
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

  initFormEditUser(): void {
    this.userdetailsfrom = new FormGroup({
      userName: new FormControl(this.detailData.full_name),
      email: new FormControl(this.detailData.email, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.email() as ValidatorFn,
      ]),
      role: new FormControl(),
      shopcode: new FormControl(this.detailData.shop_code),
      shopname: new FormControl(this.detailData.shop_name),
      shopAddress: new FormControl(this.detailData.shop_address),
      phone: new FormControl(this.detailData.phone, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(10, 11) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      idCard: new FormControl(this.detailData.id_card, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(10, 11) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      idPlace: new FormControl(this.detailData.id_place, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(10, 11) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      idDate: new FormControl(this.detailData.id_date, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(10, 11) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      s: new FormControl(this.detailData.id_date, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(10, 11) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      bank: new FormControl(this.detailData.bank_name, [
        CustomValidator.required() as ValidatorFn,
      ]),
      accNumber: new FormControl(this.detailData.bank_id, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(6, 15) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      accHolder: new FormControl(this.detailData.bank_brand, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.maxLength(50) as ValidatorFn,
      ]),
      comment: new FormControl(this.detailData.comment),
    })
  }

  takePhoto(url: string): void {
    this.displayPhoto = true
    // this.displayDetailPPC = false;
    this.imagetoshowdetailUrl = url
  }
}
