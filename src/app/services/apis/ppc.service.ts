import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import {
  PPCDetailModel,
  PPCDetailValidationModel,
  PPCItemModel,
} from 'src/app/models/ppc.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class PPCService {
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

  getListPPC(params: {
    keyWord?: string
    end?: string
    start?: string
    statusId?: string
  }): Observable<any> {
    const { end, keyWord, start, statusId } = params
    const getParams = new HttpParams()
      .set('keyWord', keyWord || '')
      .set('end', end || '')
      .set('start', start || '')
      .set('statusId', statusId || '')
      .set('userid', localStorage.getItem('userId') || '')
    return this.http
      .get(`${this.baseUrl}/process-pending-case`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },

        params: getParams,
      })
      .pipe(map((res: any) => res.map((r: any) => new PPCItemModel(r))))
  }

  getPPCDetail(id: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/process-pending-case/${id}`)
      .pipe(map((res: any) => new PPCDetailModel(res)))
  }

  checkValidation(data: {
    customer_name: string
    customer_phone: string
    id: string
    model_name: string
    sell_out_date: Date
    serial_number: string
  }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/process-pending-case/validation`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .pipe(
        map((res: any) => res.map((r: any) => new PPCDetailValidationModel(r))),
      )
  }

  updatePPC(data: {
    customer_name: string
    customer_phone: string
    model_name: string
    sell_out_date: Date
    id: string
    serial_number: string
    note: string
    status: string
    validation: PPCDetailValidationModel[]
  }): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/process-pending-case/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
  }

  getSerialNumber(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/common/serial/${id}`)
  }
}
