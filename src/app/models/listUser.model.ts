import { PPCDetailEvidenceModel } from './ppc.model'

export class ListUser {
  id: string
  username: string
  email: string
  phone: string
  role: string
  isActive: boolean
  approve: string
  evidence: PPCDetailEvidenceModel[]

  constructor(data: any) {
    this.id = data.user_id
    this.username = data.user_name
    this.email = data.email
    this.phone = data.phone
    this.role = data.role
    this.isActive = data.is_active
    switch (data.approve) {
      case 0:
        this.approve = 'Waiting'
        break
      case 1:
        this.approve = 'Approval'
        break
      case -1:
        this.approve = 'Reject'
        break
      default:
        this.approve = 'Waiting'
        break
    }
    if (data.evidence) {
      this.evidence = data.evidence.map(
        (evidence: any) => new PPCDetailEvidenceModel(evidence),
      )
    } else {
      this.evidence = []
    }
  }
}

export class RequestDetail {
  id!: string
  user_id!: string
  avatar!: string
  user_name!: string
  email!: string
  id_card!: string
  phone: string
  is_active: boolean
  shop_code!: string
  shop_name!: string
  shop_address!: string
  bank_id!: string
  bank_brand!: string
  bank_name!: string
  total_summary: string
  Sex: string
  home_address: string
  date_birth: string
  id_date: string
  id_place: string
  approve: string
  evidence: PPCDetailEvidenceModel[]
  full_name: string
  role: string
  comment: string

  constructor(data: any) {
    this.user_id = data.user_id || ''
    this.email = data.email || ''
    this.phone = data.phone || ''
    this.full_name = data.full_name || ''
    this.id_card = data.id_card || ''
    this.id_place = data.id_place || ''
    this.id_date = data.id_date || ''
    this.avatar = data.avatar || ''
    this.home_address = data.home_address || ''
    this.bank_brand = data.bank_brand || ''
    this.bank_id = data.bank_id || ''
    this.date_birth = data.date_birth || ''
    this.is_active = data.is_active || ''
    this.user_name = data.user_name || ''
    this.total_summary = data.total_summary || ''
    this.shop_code = data.shop_code || ''
    this.shop_name = data.shop_name || ''
    this.shop_address = data.shop_address || ''
    this.bank_name = data.bank_name || ''
    this.Sex = data.Sex || ''
    this.is_active = data.is_active || false
    this.role = data.role || ''
    this.comment = data.comment
    switch (data.approve) {
      case '0':
        this.approve = 'Waiting'
        break
      case '1':
        this.approve = 'Approval'
        break
      case '-1':
        this.approve = 'Reject'
        break
      default:
        this.approve = 'Waiting'
        break
    }

    if (data.evidence) {
      this.evidence = data.evidence.map(
        (evidence: any) => new PPCDetailEvidenceModel(evidence),
      )
    } else {
      this.evidence = []
    }
  }
}

export class ListRequest {
  approve: string
  approvename: string
  bank_brand: string
  bank_id: string
  date_birth: string
  email: boolean
  evidence: PPCDetailEvidenceModel[]
  full_name: string
  home_address: string
  id: string
  id_card: string
  id_place: string
  id_date: string
  message: string
  phone: string
  request_type: string

  constructor(data: any) {
    this.id = data.id
    this.email = data.email
    this.phone = data.phone
    this.message = data.message
    this.full_name = data.full_name
    this.id_card = data.id_card
    this.id_place = data.id_place
    this.id_date = data.id_date
    this.approvename = data.approvename
    this.home_address = data.home_address
    this.bank_brand = data.bank_brand
    this.bank_id = data.bank_id
    this.date_birth = data.date_birth
    switch (data.approve) {
      case 0:
        this.approve = 'Waiting'
        break
      case 1:
        this.approve = 'Approval'
        break
      case -1:
        this.approve = 'Reject'
        break
      default:
        this.approve = 'Waiting'
        break
    }
    switch (data.request_type) {
      case 0:
        this.request_type = 'Thông tin khác'
        break
      case 1:
        this.request_type = 'Yêu cầu thay đổi số điện thoại'
        break
      default:
        this.request_type = 'Thông tin khác'
        break
    }
    if (data.evidence) {
      this.evidence = data.evidence.map(
        (evidence: any) => new PPCDetailEvidenceModel(evidence),
      )
    } else {
      this.evidence = []
    }
  }
}

export const ListApproveOption = [
  {
    id: 0,
    name: 'Waiting',
  },
  {
    id: 1,
    name: 'Approval',
  },
  {
    id: -1,
    name: 'Reject',
  },
]

export const ListRequestOption = [
  {
    id: 1,
    name: 'Change mobile phone number',
  },
  {
    id: 2,
    name: 'Other information',
  },
]

export const ListUserOption = [
  {
    id: 0,
    name: 'All',
  },
  {
    id: 1,
    name: 'admin',
  },
  {
    id: 2,
    name: 'PPC',
  },
  {
    id: 3,
    name: 'SO',
  },
]

export const ListCreateUserOption = [
  {
    id: 1,
    name: 'admin',
  },
  {
    id: 2,
    name: 'PPC',
  },
  {
    id: 3,
    name: 'SO',
  },
]
export class UserModel {
  id: string
  userName: string
  email: string
  roleId: any
  shopAddress: string
  shopCode: string
  shopName: string
  phone: string
  idCard: string
  bankName: string
  accountNumber: string
  avatar: string
  isActive: boolean
  userNameBank: string
  evidence: PPCDetailEvidenceModel[]

  constructor(data: any) {
    this.id = data.user_id
    this.accountNumber = data.account_number
    this.avatar = data.avatar
    this.bankName = data.bank
    this.email = data.email
    this.idCard = data.id_card
    this.isActive = data.is_active
    this.phone = data.phone
    this.roleId = data.role
    this.shopAddress = data.shop_address
    this.shopCode = data.shop_code
    this.shopName = data.shop_name
    this.userName = data.user_name
    this.userNameBank = data.user_name_bank
    if (data.evidence) {
      this.evidence = data.evidence.map(
        (evidence: any) => new PPCDetailEvidenceModel(evidence),
      )
    } else {
      this.evidence = []
    }
  }
}
