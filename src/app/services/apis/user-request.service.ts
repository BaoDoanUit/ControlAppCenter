import {
  ListRequest,
  RequestDetail,
  UserModel,
} from '../../models/listUser.model'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { ListUser } from 'src/app/models/listUser.model'

@Injectable()
export class UserRequestService {
  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  getListRequest(params: {
    keyWord?: string
    role?: string
    request_type?: string
    approve?: string
  }): Observable<any> {
    console.log('get list request')
    console.log(
      params.keyWord,
      params.role,
      params.request_type,
      params.approve,
    )
    const { keyWord, role, request_type, approve } = params
    const getParams = new HttpParams()
      .set('keyWord', keyWord || '')
      .set('roleId', role || '')
      .set('request_type', request_type || '1')
      .set('approve', approve || '0')

    return this.http
      .get(`${this.baseUrl}/requests`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: getParams,
      })
      .pipe(map((res: any) => res.map((r: any) => new ListRequest(r))))
  }

  approveRequest(id: string, data: RequestDetail): Observable<any> {
    return this.http.put<any>(
      `${environment.baseUrl}/requests/approve/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    )
  }

  getRequestDetail(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/requests/${id}`)
  }
}
