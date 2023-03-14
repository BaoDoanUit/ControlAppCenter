import { UserModel } from './../../models/listUser.model'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { ListUser } from 'src/app/models/listUser.model'

@Injectable()
export class ListUserService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK']

  productNames: string[] = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Brown Purse',
    'Chakra Bracelet',
    'Galaxy Earrings',
    'Game Controller',
    'Gaming Set',
    'Gold Phone Case',
    'Green Earbuds',
    'Green T-Shirt',
    'Grey T-Shirt',
    'Headphones',
    'Light Green T-Shirt',
    'Lime Band',
    'Mini Speakers',
    'Painted Phone Case',
    'Pink Band',
    'Pink Purse',
    'Purple Band',
    'Purple Gemstone Necklace',
    'Purple T-Shirt',
    'Shoes',
    'Sneakers',
    'Teal T-Shirt',
    'Yellow Earbuds',
    'Yoga Mat',
    'Yoga Set',
  ]

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  getListUser(params: {
    keyWord?: string
    role?: string
    approve?: string 
  }): Observable<any> {
    const { keyWord, role, approve } = params
    const getParams = new HttpParams()
      .set('keyWord', keyWord || '')
      .set('roleId', role || '')
      .set('approve', approve || '0')

    return this.http
      .get(`${this.baseUrl}/user`, {
        params: getParams,
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .pipe(map((res: any) => res.map((r: any) => new ListUser(r))))
  }

  postCreateUser(
    account_number: string,
    bank_name: string,
    email: string,
    id_card: string,
    password: string,
    phone: any,
    role_id: any,
    shop_address: string,
    shop_code: string,
    shop_name: string,
    user_name: string,
    user_name_bank: string,
  ): Observable<any> {
    

    const bodyCreateRequest = {
      account_number,
      bank_name,
      email,
      id_card,
      password,
      phone,
      role_id,
      shop_address,
      shop_code,
      shop_name,
      user_name,
      user_name_bank,
    }
    return this.http.post<any>(`${environment.baseUrl}/user`, bodyCreateRequest, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  updateUserDetail(data: {
    user_id: string
    account_number: string
    avatar: string
    bank_name: string
    email: string
    id_card: string
    is_active: boolean
    phone: string
    shop_code: string
    shop_name: string
    user_name: string
    user_name_bank: string
  }): Observable<any> {
    return this.http.put(`${environment.baseUrl}/user/${data.user_id}`, data, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }

  getUserDetail(id: any): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/user/${id}`)
      .pipe(map((res: any) => new UserModel(res)))
  }

  approveUser(data: any) : Observable<any> {
    
    return this.http.put(`${environment.baseUrl}/user/approve/${data.user_id}`, data, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }
}
