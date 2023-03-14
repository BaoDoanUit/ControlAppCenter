import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  login(userName: string, password: string): Observable<any> {
    const bodyLoginRequest = {
      password,
      user_name: userName
    };
    return this.http.post<any>(
      `${environment.baseUrl}/user/login`,
      bodyLoginRequest
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post(
      `${environment.baseUrl}/user/refresh-token`,
      {},
      {
        headers: {
          isRefreshToken: 'true'
        }
      }
    );
  }
}
