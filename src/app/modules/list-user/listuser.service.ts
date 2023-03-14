import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class listuserservice {
  constructor(private http: HttpClient) {}

  getUser(keyWord: string, role_id: string, approve: number = 0) {
    let params = new HttpParams()
      .set('keyWord', keyWord.toString())
      .set('role_id', role_id.toString())
      .set('approve', approve.toString());

    return this.http.get<any>(`${environment.baseUrl}/user`, { params });
  }
}
