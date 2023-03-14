export class bank{
  en_name: string;
  vn_name: string;

  constructor(data: any) {
    this.en_name = data.en_name;
    this.vn_name = data.vn_name;
  }
}
