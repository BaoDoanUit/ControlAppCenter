import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { DetailResultModel } from 'src/app/models/person.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DetailPageService {
  constructor(private http: HttpClient) {}

  // public getDetail(workernum: string): Observable<DetailResultModel> {
  //   const params = new HttpParams().set('query', workernum);
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     }),
  //     params
  //   };
  //   return this.http
  //     .get(`${environment.baseUrl}/get_detail`, options)
  //     .pipe(map((res: any) => new DetailResultModel(res)));
  // }
}
