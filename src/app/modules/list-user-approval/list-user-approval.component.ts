import { UserRoleService } from 'src/app/services/app-services/role-update.service';
import { CustomValidator } from '../../validators/custom-validator';
import { UserModel, ListCreateUserOption, ListApproveOption } from '../../models/listUser.model';
import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ListUser, ListUserOption } from 'src/app/models/listUser.model';
import { ListUserService } from 'src/app/services/apis/user.service';
import { SpinnerService } from 'src/app/sharedComponent/spinner/spinner.service';
import { FormControl, FormGroup, Validator, ValidatorFn } from '@angular/forms';
import { bank } from 'src/app/models/bank.model';
import { CommonService } from 'src/app/services/apis/common.service';
import { forkJoin } from 'rxjs';
import { max } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list-user-apporval',
  templateUrl: './list-user-approval.component.html',
  styleUrls: ['./list-user-approval.component.scss'],
})
export class ListUserApporvalComponent implements OnInit {
  disabled = true;
  UserOtion: any[] = ListUserOption;
  ApproveOption: any[] = ListApproveOption;
  createUserOption = ListCreateUserOption;
  Listuser: ListUser[] = [];
  selectedUserId = '3';
  selectedOption = '0';
  
  searchKeyWord = '';
  displayDialogAdmin = false;
  displayDialogUser = false;
  displayNewUser = false;
  checked = false;
  searchKeywords = '';

  Bank: bank[] = [];
  selectedBank = '';

  username = '';
  email = '';
  usernamebank = '';
  shopAddress = '';
  shopname = '';
  shopcode = '';
  roleid: any = '';
  phone: any = '';
  password = '';
  idcard = '';
  bankname = '';
  accountnumber = '';
  showInfoForSO = false;
  isShopCodeValid = true;
  userDetailData: UserModel = new UserModel({});
  detailData: ListUser = new ListUser({});
  isEditUserDetail = false;
  editAdminData: any;
  editUserData: any;

  displayPhoto: boolean = false;
  imagetoshowdetailUrl: string = '';

  createUserForm: FormGroup = new FormGroup({});
  admindetails: FormGroup = new FormGroup({});
  userdetailsfrom: FormGroup = new FormGroup({});
  constructor(
    private userService: ListUserService,
    private spinnerService: SpinnerService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.username = '';
    this.email = '';
    this.usernamebank = '';
    this.shopAddress = '';
    this.shopcode = '';
    this.shopname = '';
    this.roleid = '';
    this.phone = '';
    this.password = '';
    this.idcard = '';
    this.bankname = '';
    this.accountnumber = '';
    this.handleGetListUser();
    this.initFormGroup();
  }

  showDialog(userRole: string, userId: string): void {
    //this.spinnerService.show();
    if (userRole === 'admin' || userRole === 'PPC') {
      this.displayDialogAdmin = true;
    }
    if (userRole === 'SO') {
      this.displayDialogUser = true;
      // this.handleGetListBank();
    }

    this.detailData = this.Listuser.filter(u => u.id == userId)[0];

    forkJoin([
      this.userService.getUserDetail(userId),
      this.commonService.getBank(),
    ]).subscribe(
      ([userData, listBankData]) => {
        this.userDetailData = userData;
        console.log(this.userDetailData, userData)
        this.editAdminData = this.userDetailData;
        this.editUserData = JSON.parse(JSON.stringify(userData));
        this.initFormEdit();
        this.initFormEditUser();
        this.Bank = listBankData;
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.message,
        });
      }
    );
  }
  showNewUser(): void {
    this.displayNewUser = true;
    this.handleGetListBank();
  }

  handleApproveUser(user_name: string, user_id: string, approve: number){
    console.log(user_id, user_name, approve);
    this.userService.approveUser({user_id, approve}).subscribe( (res) => {
      this.displayDialogUser = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: approve == 1 ? 'Approval user success!' : 'Reject user success!', 
      });
      this.handleGetListUser();
    },
    (error) => {
      this.spinnerService.hide();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error.message,
      });
    })
  }

  handleGetListUser(): void {
    this.spinnerService.show();
    this.userService
      .getListUser({
        keyWord: this.searchKeywords,
        role: this.selectedUserId,
        approve: this.selectedOption
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.Listuser = res;
          this.spinnerService.hide();
          this.shopAddress = '';
          this.shopcode = '';
          this.shopname = '';
          this.bankname = '';
          this.accountnumber = '';
          this.usernamebank = '';
        },
        (error) => {
          this.spinnerService.hide();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
  }

  handleGetListBank(): void {
    this.spinnerService.show();
    this.commonService.getBank().subscribe((res) => {
      this.Bank = res;
      this.spinnerService.hide();
    });
  }

  handleCreate(): void {
    this.spinnerService.show();
    console.log(this.bankname);
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
        this.usernamebank
      )
      .subscribe(
        (res) => {
          this.displayNewUser = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Create success!',
          });
          this.handleGetListUser();
          this.createUserForm.reset();
          this.showInfoForSO = false;
        },
        (error) => {
          this.spinnerService.hide();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
        }
      );
  }

  handleChangeActiveUser(user: any): void {
    const message = user.isActive
      ? this.translate.instant('activated.title')
      : this.translate.instant('inactivated.title');
    this.confirmationService.confirm({
      message,
      accept: () => {
        this.spinnerService.show();
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
          } = res;

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
          };

          this.userService.updateUserDetail(dataUpdate).subscribe(
            () => {
              this.spinnerService.hide();
              this.userDetailData = new UserModel({});
              this.messageService.add({
                severity: 'success.',
                summary: 'Success',
                detail: 'Update success!',
              });
            },
            (error) => {
              this.spinnerService.hide();
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: error.error.message,
              });
              setTimeout(() => {
                user.isActive = !user.isActive;
              });
            }
          );
        });
      },
      reject: () => {
        setTimeout(() => {
          user.isActive = !user.isActive;
        });
      },
    });
  }

  handleUpdateUser(isChangeActive?: boolean): void {
    this.confirmationService.confirm({
      message: 'update',
      accept: () => {
        this.spinnerService.show();
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
        } = this.userDetailData;

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
        };

        this.userService.updateUserDetail(dataUpdate).subscribe(
          (res) => {
            this.spinnerService.hide();
            this.handleGetListUser();
            this.messageService.add({
              severity: 'success',
              summary: 'Succes',
              detail: 'Update success!',
            });
            this.userDetailData.isActive = isChangeActive
              ? !isActive
              : isActive;
            this.displayDialogAdmin = false;
          },
          (error) => {
            this.spinnerService.hide();
            this.messageService.add({
              severity: 'success',
              summary: 'Error',
              detail: error.error.message,
            });
          }
        );
      },
    });
  }

  handleChangeRole(): void {
    this.showInfoForSO = this.roleid === 3;
    if (this.showInfoForSO) {
      this.createUserForm.addControl(
        'accountnumber',
        new FormControl('', [
          CustomValidator.required() as ValidatorFn,
          CustomValidator.rangeLength(6, 15) as ValidatorFn,
          CustomValidator.positiveNumber() as ValidatorFn,
        ])
      );
      this.createUserForm.addControl(
        'usernamebank',
        new FormControl('', [
          CustomValidator.required() as ValidatorFn,
          CustomValidator.maxLength(50) as ValidatorFn,
        ])
      );
      this.createUserForm.addControl(
        'shopcode',
        new FormControl('', [
          CustomValidator.required() as ValidatorFn,
          CustomValidator.rangeLength(6, 6) as ValidatorFn,
          CustomValidator.positiveNumber() as ValidatorFn,
        ])
      );
    } else {
      this.createUserForm.removeControl('accountnumber');
      this.createUserForm.removeControl('usernamebank');
      this.createUserForm.removeControl('shopcode');
    }

    this.shopname = '';
    this.shopcode = '';
    this.bankname = '';
    this.accountnumber = '';
    this.usernamebank = '';
  }

  getShopNameByShopCode(): void {
    this.spinnerService.show();

    this.commonService.getShopNameByShopCode(this.shopcode).subscribe(
      (res) => {
        this.shopname = res.shop_name;
        this.isShopCodeValid = res.exist_status;
        this.spinnerService.hide();
      },
      (error) => {
        this.spinnerService.hide();
      }
    );
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
      shopAddress: new FormControl('', [CustomValidator.required() as ValidatorFn]),
      bankName: new FormControl(''),
    });
  }

  initFormEdit(): void {
    this.admindetails = new FormGroup({
      userName: new FormControl(),
      email: new FormControl(this.editAdminData.email, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.email() as ValidatorFn,
      ]),
      idCard: new FormControl(this.editAdminData.idCard, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(9, 10) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      phone: new FormControl(this.editAdminData.phone, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(10, 11) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      roleId: new FormControl(this.editAdminData.roleId),
    });
    this.admindetails.controls['email'].valueChanges.subscribe((value) => {
      this.editAdminData.email = value;
      this.userDetailData = this.editAdminData;
    });
    this.admindetails.controls['idCard'].valueChanges.subscribe((value) => {
      this.editAdminData.idCard = value;
      this.userDetailData = this.editAdminData;
    });
    this.admindetails.controls['phone'].valueChanges.subscribe((value) => {
      this.editAdminData.phone = value;
      this.userDetailData = this.editAdminData;
    });
  }

  initFormEditUser(): void {
    this.userdetailsfrom = new FormGroup({
      userName: new FormControl(),
      email: new FormControl(this.editUserData.email, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.email() as ValidatorFn,
      ]),
      role: new FormControl(),
      shopcode: new FormControl(),
      shopname: new FormControl(),
      phone: new FormControl(this.editUserData.phone, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(10, 11) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      idCard: new FormControl(this.editUserData.idCard, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(10, 11) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      bank: new FormControl(this.editUserData.bankName, [
        CustomValidator.required() as ValidatorFn,
      ]),
      accNumber: new FormControl(this.editUserData.accountNumber, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.rangeLength(6, 15) as ValidatorFn,
        CustomValidator.positiveNumber() as ValidatorFn,
      ]),
      accHolder: new FormControl(this.editUserData.userNameBank, [
        CustomValidator.required() as ValidatorFn,
        CustomValidator.maxLength(50) as ValidatorFn,
      ]),
    });
    this.userdetailsfrom.controls['email'].valueChanges.subscribe((value) => {
      this.editUserData.email = value;
      this.userDetailData = this.editUserData;
    });
    this.userdetailsfrom.controls['phone'].valueChanges.subscribe((value) => {
      this.editUserData.phone = value;
      this.userDetailData = this.editUserData;
    });
    this.userdetailsfrom.controls['idCard'].valueChanges.subscribe((value) => {
      this.editUserData.idCard = value;
      this.userDetailData = this.editUserData;
    });
    this.userdetailsfrom.controls['bank'].valueChanges.subscribe((value) => {
      this.editUserData.bankName = value;
      this.userDetailData = this.editUserData;
    });
    this.userdetailsfrom.controls['accNumber'].valueChanges.subscribe(
      (value) => {
        this.editUserData.accountNumber = value;
        this.userDetailData = this.editUserData;
      }
    );
    this.userdetailsfrom.controls['accHolder'].valueChanges.subscribe(
      (value) => {
        this.editUserData.userNameBank = value;
        this.userDetailData = this.editUserData;
      }
    );
  }

  takePhoto(url: string): void {
    this.displayPhoto = true;
    // this.displayDetailPPC = false;
    this.imagetoshowdetailUrl = url;
  }
}
