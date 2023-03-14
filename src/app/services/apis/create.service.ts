import { Observable, of } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CreateUser } from 'src/app/models/createUser.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class CreateUserService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK']
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  postCreateUser(
    account_number: string,
    bank_name: string,
    email: string,
    id_card: string,
    password: string,
    phone: any,
    role_id: any,
    shop_code: string,
    shop_name: string,
    user_name: string,
    user_name_bank: string,
  ) {
    const bodyCreateRequest = {
      account_number,
      bank_name,
      email,
      id_card,
      password,
      phone,
      role_id,
      shop_code,
      shop_name,
      user_name,
      user_name_bank,
    }
    return this.http.post<any>(
      `${environment.baseUrl}/user`,
      bodyCreateRequest,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
  }
}
