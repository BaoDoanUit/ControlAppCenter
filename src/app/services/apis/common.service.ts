import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { bank } from 'src/app/models/bank.model'

@Injectable()
export class CommonService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK']

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  getBank(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/common/bank`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .pipe(map((res: any) => res.map((r: any) => new bank(r))))
  }

  getShopNameByShopCode(shopCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/common/shop/${shopCode}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
  }
}
