import { Component, OnInit, Input } from '@angular/core'
import {
  SelectItem,
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
} from 'primeng/api'
import { Product } from './product'
import { ProductService } from './productservice'
import { SortEvent } from 'primeng/api'
import { PPCService } from 'src/app/services/apis/ppc.service'
import {
  PPCDetailModel,
  PPCItemModel,
  PPCStatusOption,
} from 'src/app/models/ppc.model'
import { SpinnerService } from 'src/app/sharedComponent/spinner/spinner.service'
import { TranslateService } from '@ngx-translate/core'
import Utils from '../helper/utils'
@Component({
  selector: 'app-list-ppc',
  templateUrl: './list-ppc.component.html',
  styleUrls: ['./list-ppc.component.scss'],
})
export class ListPPCComponent implements OnInit {
  ppcOption: any[] = PPCStatusOption
  selectedPPCId = ''
  searchKeyWord = ''
  ppcList: PPCItemModel[] = []
  displayDetailPPC = false
  rangeDates: any
  displayPhoto = false
  imagetoshowdetailUrl = ''

  ppcDetailData: PPCDetailModel = new PPCDetailModel({})
  constructor(
    private ppcService: PPCService,
    private spinnerService: SpinnerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.handleGetListPPC()
    this.rangeDates = [Utils.addDays(new Date(), -30), new Date()]
  }

  showModal(id: string): void {
    this.displayDetailPPC = true
    this.spinnerService.show()

    this.ppcService.getPPCDetail(id).subscribe(
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

  handleGetListPPC(): void {
    this.spinnerService.show()
    if (this.rangeDates && this.rangeDates?.length < 2) {
      console.log(this.rangeDates)
      this.ppcList = []
      return
    } else {
      this.ppcService
        .getListPPC({
          end:
            (this.rangeDates &&
              this.rangeDates[1] &&
              this.getDateStringFromDateObject(this.rangeDates[1])) ||
            '',
          keyWord: this.searchKeyWord,
          start:
            (this.rangeDates &&
              this.rangeDates[0] &&
              this.getDateStringFromDateObject(this.rangeDates[0])) ||
            '',
          statusId: this.selectedPPCId || '',
        })
        .subscribe(
          (res) => {
            this.ppcList = res
            this.spinnerService.hide()
          },
          (error) => {
            this.spinnerService.hide()
          },
        )
    }
  }

  takePhoto(url: string): void {
    this.displayPhoto = true
    // this.displayDetailPPC = false;
    this.imagetoshowdetailUrl = url
  }

  getDateStringFromDateObject(date: Date): string {
    const year = date.getFullYear()
    const month =
      date.getMonth() > 8 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`
    const day = date.getDate() > 9 ? `${date.getDate()}` : `0${date.getDate()}`
    return `${year}-${month}-${day}`
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
        } = this.ppcDetailData
        const dataCheckValidate = {
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

        this.ppcService.updatePPC(dataCheckValidate).subscribe(
          () => {
            this.spinnerService.hide()
            setTimeout(() => {
              this.displayDetailPPC = false
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Update success!',
              })
              this.handleGetListPPC()
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
}
