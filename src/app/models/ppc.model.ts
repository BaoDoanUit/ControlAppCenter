import { ThrowStmt } from '@angular/compiler'

export class PPCItemModel {
  id: string
  userSubmited: string
  serialNumber: string
  modelName: string
  customerName: string
  dateSubmited: string
  waitingDay: string
  status: string

  constructor(data: any) {
    this.id = data.id
    this.userSubmited = data.created_by
    this.serialNumber = data.serial_number
    this.modelName = data.model_name
    this.customerName = data.customer_name
    this.dateSubmited = data.created_date
    this.waitingDay = data.waiting_day
    this.status = StatusMapping[data.status]
  }
}

export class PPCDetailModel {
  id: string
  modelName: string
  serialNumber: string
  selloutDate: Date
  customerName: string
  customerPhone: string
  status: string
  note: string
  comment: string
  evidence: PPCDetailEvidenceModel[]
  validation: PPCDetailValidationModel[]
  activity: PPCDetailActivityModel[]
  constructor(data: any) {
    this.id = data.id
    this.modelName = data.model_name
    this.serialNumber = data.serial_number
    this.selloutDate = new Date(data.sell_out_date)
    this.customerName = data.customer_name
    this.customerPhone = data.customer_phone
    this.comment = data.comment || ''
    this.status = StatusMapping[data.status]
    this.note = data.note
    if (data.evidence) {
      this.evidence = data.evidence.map((evidence: any) => new PPCDetailEvidenceModel(evidence))
    } else {
      this.evidence = []
    }
    if (data.validation) {
      this.validation = data.validation.map(
        (validation: any) => new PPCDetailValidationModel(validation),
      )
    } else {
      this.validation = []
    }
    if (data.activity) {
      this.activity = data.activity.map(
        (activity: any) => new PPCDetailActivityModel(activity),
      )
    } else {
      this.activity = []
    }
  }
}

type CategoryMapping = {
  [key: string]: string
}
const PPCDetailCategoryMapping: CategoryMapping = {
  serial_number: 'Serial Number',
  red_voice: 'Red Voice',
  product: 'Product',
}
export class PPCDetailEvidenceModel {
  category: string
  url: string

  constructor(data: any) {
    this.category = PPCDetailCategoryMapping[data.category]
    this.url = data.url
  }
}

export class PPCDetailValidationModel {
  color: string
  description: string
  status: string

  constructor(data: any) {
    this.color = data.color
    this.description = data.description
    this.status = data.status
  }
}

export class PPCDetailActivityModel {
  activity: string
  avatar: string
  createdBy: string
  createdAt: string
  comment: string

  constructor(data: any) {
    this.activity = data.activity
    this.avatar = data.avatar
    this.createdBy = data.created_by
    this.createdAt = data.created_date
    this.comment = data.comment
  }
}

export const PPCStatusOption = [
  {
    id: 0,
    name: 'All',
  },
  {
    id: 1,
    name: 'Rejected',
  },
  {
    id: 2,
    name: 'Approved',
  },
  {
    id: 3,
    name: 'Canceled',
  },
  {
    id: 4,
    name: 'In Progress',
  },
]

const StatusList = {
  Rejected: 'Rejected',
  Approved: 'Approved',
  Canceled: 'Canceled',
  'Re-submit': 'Re-submit',
  Submit: 'Submit',
  InProgress: 'In Progress',
}

const StatusMapping = {
  [StatusList.Rejected]: StatusList.Rejected,
  [StatusList.Approved]: StatusList.Approved,
  [StatusList.Canceled]: StatusList.Canceled,
  [StatusList['Re-submit']]: StatusList.InProgress,
  [StatusList.Submit]: StatusList.InProgress,
}

export class PPCV3Model {
  approve_byname: string
  id: number
  package_date: string
  package_name: string
  percent: number
  qty: number
  target_approve: number
  waiting_day: number
  constructor(data: any) {
    this.approve_byname = data.approve_byname || ''
    this.id = data.id || 0
    this.package_date = data.package_date || ''
    this.package_name = data.package_name || ''
    this.percent = data.percent || 0
    this.qty = data.qty || 0
    this.target_approve = data.target_approve || 0
    this.waiting_day = data.waiting_day || 0
  }
}

export class PPCV3ModelDetail {
  created_by: string
  created_date: string
  customer_name: string
  id: number
  model_name: string
  serial_number: string
  status: string
  waiting_day: number
  constructor(data: any) {
    this.created_by = data.created_by
    this.created_date = data.created_date
    this.customer_name = data.customer_name
    this.id = data.id
    this.model_name = data.model_name
    this.serial_number = data.serial_number
    this.status = data.status
    this.waiting_day = data.waiting_day
  }
}
