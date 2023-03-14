import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import {
  PPCDetailModel,
  PPCDetailValidationModel,
  PPCItemModel,
  PPCV3Model,
  PPCV3ModelDetail,
} from 'src/app/models/ppc.model'
import { environment } from 'src/environments/environment'

@Injectable()
export class PPCV3Service {
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

  getListPPCV3(params: {
    keyWord?: string
    end?: string
    start?: string
    statusId?: string
  }): Observable<any> {
    const { end, start, keyWord, statusId } = params
    const getParams = new HttpParams()
      .set('end', end || '')
      .set('start', start || '')
      .set('keyWord', keyWord || '')
      .set('statusId', statusId || '')
      .set('userid', localStorage.getItem('userId') || '')
    return this.http
      .get(`${this.baseUrl}/process-pending-case-package`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: getParams,
      })
      .pipe(map((res: any) => res.map((r: any) => new PPCV3Model(r))))
  }

  getPPCV3Detail(id: string): Observable<any> {
    const getParams = new HttpParams()
      .set('packageId', id || '')
      .set('userid', localStorage.getItem('userId') || '')

    return this.http
      .get(`${this.baseUrl}/process-pending-case-package/detail`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: getParams,
      })
      .pipe(map((res: any) => res.map((r: any) => new PPCItemModel(r))))
  }

  getPPCDetail(id: string): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/process-pending-case-package/detail/${id}`)
      .pipe(map((res: any) => new PPCDetailModel(res)))
  }

  updatePPC(data: {
    comment: string
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
      `${this.baseUrl}/process-pending-case-package/approve/${data.id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
  }
  approveAll(packageId: number): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/process-pending-case-package/approveall/${packageId}/${localStorage.getItem('userId')}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
  }
}
