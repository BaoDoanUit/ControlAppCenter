export class CreateUser{
  account_number: string;
  bank_name: string;
  email: string;
  id_card: string;
  password: string;
  phone: any;
  role_id: number;
  shop_address: string,
  shop_code: string;
  shop_name: string;
  user_name: string;
  user_name_bank: string;

  constructor(data: any) {
    this.account_number = data.account_number;
    this.bank_name = data.bank_name;
    this.email = data.email;
    this.id_card = data.id_card;
    this.password = data.password;
    this.phone = data.phone;
    this.role_id = data.role_id;
    this.shop_address = data.shop_address;
    this.shop_code = data.shop_code;
    this.shop_name = data.shop_name;
    this.user_name = data.user_name;
    this.user_name_bank = data.user_name_bank;
  }
}
