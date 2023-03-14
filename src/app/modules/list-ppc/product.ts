export class Product {
  id?:string;
  usersummited?:string;
  serialnumber?:string;
  modelname?:string;
  custumername?:string;
  datesubmit?:Date;
  status?:string;
  waittingday?:string;

  constructor(data: any) {
    this.id = data.id;
    this.usersummited = data.usersummited;
    this.serialnumber = data.serialnumber;
    this.modelname = data.modelname;
    this.custumername = data.custumername;
    this.datesubmit = data.datesubmit;
    this.status = data.status;
    this.waittingday = data.waittingday;
  }
}
