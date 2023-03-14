export class User {
  id?: string;
  username?: string;
  Email?: string;
  phone?: number;
  role?: string;

  constructor(data: any) {
    this.id = data.id;
    this.username = data.Username;
    this.Email = data.Email;
    this.phone = data.Phone;
    this.role = data.Role;
  }
}

export class modal {
  id?: string;
  serialnumber?: string;
  modalname?: string;
  datesubmitted?: number;
  status?: string;

  constructor(data: any) {
    this.id = data.id;
    this.serialnumber = data.serialnumber;
    this.modalname = data.modalname;
    this.datesubmitted = data.datesubmitted;
    this.status = data.status;
  }
}
